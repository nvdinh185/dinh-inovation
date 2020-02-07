"use strict"

/**
 * Bộ xử lý phát hành thông báo cước ra file pdf
 * 
 */
const fs = require('fs');
const PDFUtil = require('../../utils/pdf-util')
const vietnameseUtil = require('../../utils/vietnamese-handler')
const { numberWithSeparator } = require('../../utils/array-object')
const dateUtil = require('../../utils/date-util')
const QRCodeUtil = require('../../utils/qrcode-util')
const systempath = require('path');

const {
    getEbillPdfOptions
} = require('../../app/services/bills');

const config = require('../../app/config')

// Kết nối csdl oracle theo pool
const db = require('../../db/oracle/db-pool');

class EBillPdfHandler {

    /**
     * Đọc đường dẫn lấy được /:month/:isdn/:shortkey
     * Đọc csdl oracle lấy bill_cyle, isdn, otpkey
     * Nếu có bảng ghi được trùng khớp 3 thông tin này thì 
     * Lấy path (đường dẫn đã tạo file pdf trước đó) trả kết quả cho client
     * Nếu chưa thì tạo file pdf, ký vào và ghi lại vào csdl, trả kết quả
     * Đồng thời ghi nhận số lần truy cập lấy file này vào csdl nhằm thống kê
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getEBill(req, res, next) {

        let link = req.originalUrl;
        let { month, isdn, shortkey } = req.params;

        // /ebill/mf3/<month>/<isdn>/<keycode>
        
        let billAll = new Promise((resolve, reject) => {
      
            let fileName = link.slice(11, 15) + '-' + link.slice(15);
            let filepath = `${config.PATH.ROOT_FOLDER}/${fileName}.pdf`;
            let fileName4Os = filepath.replace(new RegExp(`\\${systempath.sep}`, `g`), systempath.sep);
            // file tồn tại trước đó rồi thì trả về luôn ko truy vấn db làm gì
            if (fs.existsSync(fileName4Os)) {
                resolve(fileName4Os);
                return;
            }

            // trường hợp chưa có file pdf thì tạo file:
            db.getRst(`
                --II. SQL 2 -- xem phat hanh thong bao cuoc thuc te theo link
                WITH
                -- SQL GOC
                charge_bill
                AS
                    (SELECT *
                        FROM report_bill
                        WHERE bill_cycle = TO_DATE('${month}', 'yyyy-mm') AND url_link = '${link}') -- cau lenh goc
                                                                                                                                                            ,
                -- SQL 1 = B
                charge_report
                AS
                    (SELECT a.charge_report_id
                            ,a.cust_id
                            ,a.cust_code
                            ,a.month									  AS bill_cycle
                            ,a.bill_cycle_id
                            ,a.TYPE
                            ,a.create_date
                            ,a.sta_date
                            ,a.end_date
                            ,a.cust_name
                            ,a.address
                            ,a.pay_area_code
                            ,a.pay_method
                            ,a.isdn
                            ,a.bus_type
                            ,a.sub_type
                            ,a.num_subscribers
                            ,a.adjustment
                            ,a.prior_debit
                            ,a.prom_amount
                            ,a.discount_amount
                            ,a.tax
                            ,a.tot_charge
                            ,a.category_id
                            ,a.order_code
                            ,a.number_of_copies1
                            ,a.number_of_copies2
                            ,a.item_no
                            ,a.exc_rate
                            ,a.cen_code
                            ,a.prom_amount_vat
                            ,a.prom_amount_not_vat
                            ,a.street_name
                            ,a.prom_amount_vat * a.tax * 0.01   AS tax_prom
                        FROM cus_owner.b4_charge_report@tt2 a
                        WHERE 	 a.month = TO_DATE('${month}', 'yyyy-mm')															-- thang 11
                                AND a.bill_cycle_id IN (SELECT bill_cycle_id FROM charge_bill)
                                AND a.TYPE IN ('0')
                                AND a.cen_code = '3' 																					  -- cong ty 3
                                -- chi lay danh sach khach hang cho menh de a ma thoi
                                AND a.cust_id IN (SELECT cust_id FROM charge_bill)
                                AND a.sta_date >= ADD_MONTHS(TO_DATE('${month}', 'yyyy-mm'), -1) -- thang 11 - ngay phat sinh trong thang 10
                                                                                                                    ),
                charge_details
                AS
                    (  SELECT b.charge_report_id
                                ,SUM(CASE WHEN b.bill_item_id IN (0) THEN b.charge ELSE 0 END)			  fee_charge
                                ,SUM(CASE
                                        WHEN b.bill_item_id IN (1
                                                                        ,2
                                                                        ,8
                                                                        ,9
                                                                        ,10
                                                                        ,11
                                                                        ,12
                                                                        ,13)
                                        THEN
                                            b.charge
                                        ELSE
                                            0
                                        END)																					  package_charge
                                ,SUM(CASE WHEN b.bill_item_id IN (31) THEN b.charge ELSE 0 END)			  nat_charge
                                ,SUM(CASE WHEN b.bill_item_id IN (32) THEN b.charge ELSE 0 END)			  int_charge
                                ,SUM(CASE
                                        WHEN b.bill_item_id IN (4
                                                                        ,5
                                                                        ,6
                                                                        ,7)
                                        THEN
                                            b.charge
                                        ELSE
                                            0
                                        END)																					  rmqt_charge
                                ,SUM(CASE WHEN b.bill_item_id IN (33, 34, 35) THEN b.charge ELSE 0 END)  vas_charge
                                ,SUM(b.tax * b.charge * 0.1) 														  tax_charge
                            FROM cus_owner.b4_charge_report_item@tt2 b
                        WHERE		b.month = TO_DATE('${month}', 'yyyy-mm')														-- thang 11
                                AND b.charge_report_id IN (SELECT charge_report_id FROM charge_report)
                    GROUP BY b.charge_report_id),
                -- SQL 2 = C
                charge_rmqt
                AS
                    (  SELECT b.charge_report_id
                                ,SUM(CASE
                                        WHEN b.bill_item_id IN (100
                                                                        ,101
                                                                        ,102
                                                                        ,110
                                                                        ,111
                                                                        ,112)
                                        THEN
                                            charge
                                        ELSE
                                            0
                                        END)																				 voice_rmqt_charge
                                ,SUM(CASE WHEN b.bill_item_id IN (103, 113) THEN charge ELSE 0 END)  sms_rmqt_charge
                                ,SUM(CASE WHEN b.bill_item_id IN (104, 114) THEN charge ELSE 0 END)  gprs_rmqt_charge
                            FROM b4_charge_report_item_rmqt@tt2 b
                        WHERE		b.month = TO_DATE('${month}', 'yyyy-mm')														-- thang 11
                                AND b.charge_report_id IN (SELECT charge_report_id FROM charge_report)
                    GROUP BY b.charge_report_id)
                ------------------------------------
                -- cau lenh lay du lieu ra de chay
                SELECT 
                    b.bill_cycle
                    ,b.bill_cycle_id
                    ,b.cust_id
                    ,(b.end_date+1) 																									  AS iss_date
                    ,																															-- ngay gio
                    (CASE WHEN a.area_code LIKE 'DNA' THEN a.area_code ELSE SUBSTR(a.area_code, 1, 3) END)  AS area_code
                    ,a.payment_date
                    ,b.cust_code
                    ,b.cust_name
                    ,b.address
                    ,b.isdn
                    ,b.sta_date
                    ,b.end_date
                    ,ROUND(NVL(d.package_charge, 0), 2) 																	  AS package_charge
                    ,																																	 -- 9
                    ROUND(NVL(d.fee_charge, 0), 2)																			  AS fee_charge
                    ,																																	-- 10
                    ROUND(NVL(d.nat_charge, 0), 2)																			  AS nat_charge
                    ,																																	-- 11
                    ROUND(NVL(d.int_charge, 0), 2)																			  AS int_charge
                    ,																																	-- 12
                    ROUND(NVL(c.voice_rmqt_charge, 0), 2) 																  AS voice_rmqt_charge
                    ,																																	 --13
                    ROUND(NVL(c.sms_rmqt_charge, 0), 2)																	  AS sms_rmqt_charge
                    ,																																	-- 14
                    ROUND(NVL(c.gprs_rmqt_charge, 0), 2)																	  AS gprs_rmqt_charge
                    ,																																	-- 15
                    ROUND(NVL(d.vas_charge, 0), 2)																			  AS vas_charge
                    ,																																	-- 16
                    ROUND(NVL(b.prom_amount, 0), 2) 																		  AS prom_amount
                    ,																																	-- 17
                    ROUND(NVL(b.prior_debit, 0), 2) 																		  AS prior_debit
                    ,ROUND(NVL(b.adjustment, 0), 2)																			  AS adjustment
                    ,ROUND(ROUND(NVL(d.package_charge, 0), 2) 																			 -- 9
                            + ROUND(NVL(d.fee_charge, 0), 2)																				-- 10
                            + ROUND(NVL(d.nat_charge, 0), 2)																				-- 11
                            + ROUND(NVL(d.int_charge, 0), 2)																				-- 12
                            + ROUND(NVL(c.voice_rmqt_charge, 0), 2)																		 --13
                            + ROUND(NVL(c.sms_rmqt_charge, 0), 2) 																		-- 14
                            + ROUND(NVL(c.gprs_rmqt_charge, 0), 2)																		-- 15
                            + ROUND(NVL(d.vas_charge, 0), 2)																				-- 16
                            - ROUND(NVL(b.prom_amount, 0), 2)
                            ,2)																														-- 17
                                                                                                                                        AS current_charge
                    ,ROUND(NVL(d.tax_charge, 0), 2)
                    - ROUND(NVL(b.tax_prom, 0), 2)																	 -- tru thue khuyen mai
                                                                                                                                        AS tax_charge
                    ,ROUND(ROUND(NVL(d.package_charge, 0), 2) 																			 -- 9
                            + ROUND(NVL(d.fee_charge, 0), 2)																				-- 10
                            + ROUND(NVL(d.nat_charge, 0), 2)																				-- 11
                            + ROUND(NVL(d.int_charge, 0), 2)																				-- 12
                            + ROUND(NVL(c.voice_rmqt_charge, 0), 2)																		 --13
                            + ROUND(NVL(c.sms_rmqt_charge, 0), 2) 																		-- 14
                            + ROUND(NVL(c.gprs_rmqt_charge, 0), 2)																		-- 15
                            + ROUND(NVL(d.vas_charge, 0), 2)																				-- 16
                            - ROUND(NVL(b.prom_amount, 0), 2)																				-- 17
                            - ROUND(NVL(b.tax_prom, 0), 2)															 -- tru thue khuyen mai
                            + ROUND(NVL(d.tax_charge, 0), 2)
                            ,2)																										  AS total_current_charge
                    ,ROUND(ROUND(NVL(d.package_charge, 0), 2) 																			 -- 9
                            + ROUND(NVL(d.fee_charge, 0), 2)																				-- 10
                            + ROUND(NVL(d.nat_charge, 0), 2)																				-- 11
                            + ROUND(NVL(d.int_charge, 0), 2)																				-- 12
                            + ROUND(NVL(c.voice_rmqt_charge, 0), 2)																		 --13
                            + ROUND(NVL(c.sms_rmqt_charge, 0), 2) 																		-- 14
                            + ROUND(NVL(c.gprs_rmqt_charge, 0), 2)																		-- 15
                            + ROUND(NVL(d.vas_charge, 0), 2)																				-- 16
                            + ROUND(NVL(d.tax_charge, 0), 2)
                            - ROUND(NVL(b.prom_amount, 0), 2)																-- tru khuyen mai
                            - ROUND(NVL(b.tax_prom, 0), 2)) 														 -- tru thue khuyen mai
                    + ROUND(NVL(b.prior_debit, 0), 2)
                    + ROUND(NVL(b.adjustment, 0), 2)																		  AS total
                    ,ROUND(NVL(b.tot_charge, 0), 2)																			  AS tot_charge
                FROM charge_bill	  a
                        ,charge_report   b
                        ,charge_rmqt	  c
                        ,charge_details  d
                WHERE	  a.cust_id = b.cust_id(+)
                        AND b.charge_report_id = c.charge_report_id(+)
                        AND b.charge_report_id = d.charge_report_id(+)
              `)
                .then(data => {
                    if (data.total !== data.tot_charge) console.log('****> Lỗi dữ liệu tổng hợp và chi tiết không khớp: ', month, data.isdn, data.tot_charge, data.total);

                    if (data
                        && data.area_code // có vùng cước -- tồn tại bảng ghi này
                        && data.total === data.tot_charge // Tổng tiền tổng hợp khớp với tổng tiền chi tiết
                    ) {
                        const provinceCode = data.area_code.slice(0, 3)
                        const districtCode = data.area_code.slice(3, 6)
                        const BANK_SQL_STATEMENT = (districtCode === null || districtCode === '') ? `select * from Bank where province_code = '${provinceCode}'`
                            : `select * from Bank where province_code = '${provinceCode}' and district_code = '${districtCode}'`

                        db.getRst(BANK_SQL_STATEMENT).then(bank => {

                            // console.log('file name', fileName);
                            const oldData = {
                                ...data,
                                branch: bank ? bank.branch : '',
                                account: bank ? bank.agr_account : '',
                                bank: bank ? bank.agr_bank : ''
                            }
                            const moneyInLetters = vietnameseUtil.StringVietnamDong(data.total, '.')
                            const pdfData = {
                                ...oldData,
                                unit: 'VND',
                                money_in_letters: moneyInLetters,
                                tot_charge: numberWithSeparator(oldData.tot_charge, '.'),
                                package_charge: numberWithSeparator(oldData.package_charge, '.'),
                                fee_charge: numberWithSeparator(oldData.fee_charge, '.'),
                                nat_charge: numberWithSeparator(oldData.nat_charge, '.'),
                                int_charge: numberWithSeparator(oldData.int_charge, '.'),
                                voice_rmqt_charge: numberWithSeparator(oldData.voice_rmqt_charge, '.'),
                                sms_rmqt_charge: numberWithSeparator(oldData.sms_rmqt_charge, '.'),
                                gprs_rmqt_charge: numberWithSeparator(oldData.gprs_rmqt_charge, '.'),
                                vas_charge: numberWithSeparator(oldData.vas_charge, '.'),
                                prom_amount: numberWithSeparator(oldData.prom_amount, '.'),
                                current_charge: numberWithSeparator(oldData.current_charge, '.'),
                                tax_charge: numberWithSeparator(oldData.tax_charge, '.'),
                                total_current_charge: numberWithSeparator(oldData.total_current_charge, '.'),
                                adjustment: numberWithSeparator(oldData.adjustment, '.'),
                                prior_debit: numberWithSeparator(oldData.prior_debit, '.'),
                                total: numberWithSeparator(oldData.total, '.'),
                                iss_date: dateUtil.toLocaleDateString(oldData.iss_date),
                                sta_date: dateUtil.toLocaleDateString(oldData.sta_date),
                                end_date: dateUtil.toLocaleDateString(oldData.end_date),
                                payment_date: dateUtil.toLocaleDateString(oldData.payment_date)
                            }

                            

                            // mã hóa link trên qrcode để kiểm tra liên kết
                            let linkForQrCode = `https://c3.mobifone.vn${link}`

                            QRCodeUtil.toQRCodeURL(linkForQrCode).then(imageUrl => {
                                const options = getEbillPdfOptions({ fileName, pdfData, imageUrl });

                                if (!fs.existsSync(fileName4Os)) {
                                    fs.mkdirSync(fileName4Os.split(systempath.sep).slice(0, -1).join(systempath.sep), { recursive: true });
                                    PDFUtil.createPdf(options, fileName4Os);
                                }

                                // QUESTION: tại sao phải cần 2s? chờ cho việc tạo file xong 
                                setTimeout(() => {
                                    resolve(fileName4Os)
                                }, 2000);
                            })
                        })
                    }
                    else {
                        throw `Xin lỗi thông tin của quý khách không đúng (${data.tot_charge} <> ${data.total}), xin vui lòng kiểm tra lại hoặc liên hệ 18001090 để được hướng dẫn`
                    }
                })
                .catch(err => {
                    // console.log(err)
                    reject(err)
                })
        })


        billAll.then(result => {
            // console.log('result: ', result);
            let filename = result.replace(new RegExp(`\\${systempath.sep}`, `g`), systempath.sep);

            fs.readFile(filename, { flag: 'r' }, async (err, bufferPdf) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({
                        message: 'Lỗi đọc file',
                        filename: filename,
                        error: err
                    }, null, 2
                    ));
                } else {

                    try {
                        await db.update(db.convertSqlFromJson('report_bill', {
                            bill_cycle: `__$to_date('${month}', 'yyyymm')`,
                            url_link: link,
                            request_count: `__$(nvl(request_count,0)+1)`,
                            ip: req.clientIp,
                            last_update_time: `__$sysdate`
                        }, ["bill_cycle", "url_link"]));

                        console.log('updated link:', link);
                        
                    } catch (e) { }

                    res.writeHead(200, { 'Content-Type': 'application/pdf; charset=utf-8' });
                    // Ghi nhan vao csdl la da doc file pdf nay 1 lan
                    res.end(bufferPdf);
                }
            });

        })
            .catch(err => {
                console.log('Lỗi: ', err);
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    status: 'NOK',
                    message: 'Lỗi đọc thông báo cước này',
                    error: err
                }
                    , (key, value) => {
                        if (value === null) return undefined
                        return value
                    }
                    , 2
                ));
            });
    }
}

module.exports = new EBillPdfHandler();