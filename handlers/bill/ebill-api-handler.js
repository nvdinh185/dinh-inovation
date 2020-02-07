"use strict"

/**
 * Bộ xử lý tương tác cơ sở dữ liệu để lấy kết quả cho client cho chức năng quản trị phát hành
 */

// Kết nối csdl oracle theo pool
const db = require('../../db/oracle/db-pool');

class EBillHandler {
    
    /**
     * 1. Gọi hàm phát hành thông báo cước cho kỳ
     * Trường hợp kỳ phát hành đã phát rồi thì trả về thông tin đã phát hành
     * 
     */
    createEBill(req, res, next) {

        let { month, period } = req.json_data;

        // chức năng này để hàm chạy trực tiếp trên server dưới dạng promise 
        // khi nào xong thì in ra log hoặc trả một notify cho client
        // vì việc chạy hàm này cho 200k khách hàng mất cỡ 4h
        // do vậy client không đợi kết quả ngay
        let returnError;
        // Trường hợp nếu tiến trình có một ai đó đã đang chạy, hoặc đã chạy trước đó,
        // thì kết quả sẽ trả về trong 1 giây, thì trả luôn kết quả này về ko cần trả session_monitor nhé
        db.executeJavaFunction(`pkg_charge_report.create_bill_report`, [month, period, req.user ? req.user.email : ''])
            .then(data => {
                console.log('Đã phát hành xong: ', data);
                returnError = data; // trường hợp lỗi đang chạy sẽ trả về ngay message=""
            })
            .catch(err => {
                console.log('Lỗi quá trình phát hành: ', err);
                // gọi hàm oracle để phát hành, 
                // lỗi xãy ra, quá trình chạy
                returnError = err;
            });

        // sau 2 giây mà có kết qủa ngay thì trả luôn thông tin    
        setTimeout(() => {
            if (returnError) {
                // trả luôn kết quả cho client lỗi (do gọi hàm hoặc đã chạy)
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    status: 'NOK',
                    message: returnError
                }
                    , (key, value) => {
                        if (value === null) return undefined
                        return value
                    }
                    , 2
                ));
                return;
            }   
            // nên để trong csdl thực thi, còn client sẽ theo dõi ở session monitor                
            // console.log('Khong co ket qua bay gio sau 2 giay');
            next(); // phía sau lấy hàm chạy của nó   
        }, 2000);

    }

    // 2. Theo dõi tiến trình phát hành thông báo cước
    // kết quả trả về là json với 
    // - status = 1 là hoàn thành, 2 bắt đầu, 3 đang chạy, 5 lỗi; 
    // - description = là mô tả thông tin theo dõi tiến trình
    getSessionBill(req, res, next) {
        // console.log('Lay ket qua connection cua pool');
        db.getRst(`
        select * from session_monitor
        where session_id = 1
        `)
            .then(result => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(result
                    , (key, value) => {
                        if (value === null) return undefined
                        return value
                    }
                    , 2
                ));
            })
            .catch(err => {
                console.log('Lỗi: ', err);
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    status: 'NOK',
                    message: 'Lỗi đọc thong tin session',
                    error: err
                }
                    , (key, value) => {
                        if (value === null) return undefined
                        return value
                    }
                    , 2
                ));
            })
    }


    // 3. Gọi hàm gửi sms All trong csdl Oracle
    sendSmsAll(req, res, next) {

        let { month, period } = req.json_data;

        let returnError;
        // hàm gửi smsAll sẽ chạy rất lâu cho 200k bảng ghi, chạy trực tiếp trong csdl oracle
        // Trường hợp nếu tiến trình có một ai đó đã đang chạy, hoặc đã chạy trước đó,
        // thì kết quả sẽ trả về trong 1 giây, thì trả luôn kết quả này về ko cần trả session_monitor nhé
        db.executeJavaFunction(`pkg_charge_report.send_sms_all`, [month, period, req.user ? req.user.email : ''])
            .then(data => {
                console.log('Gửi sms xong: ', data);
                returnError = data; // trường hợp lỗi đang chạy sẽ trả về ngay message=""
            })
            .catch(err => {
                console.log('Lỗi quá trình gửi sms: ', err);
                // gọi hàm oracle để phát hành, 
                // lỗi xãy ra, quá trình chạy
                returnError = err;
            });

        // sau 2 giây mà có kết qủa ngay thì trả luôn thông tin    
        setTimeout(() => {
            if (returnError) {
                // trả luôn kết quả cho client lỗi (do gọi hàm hoặc đã chạy)
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    status: 'NOK',
                    message: returnError
                }
                    , (key, value) => {
                        if (value === null) return undefined
                        return value
                    }
                    , 2
                ));
            } else {
                // nên để trong csdl thực thi, còn client sẽ theo dõi ở session monitor
                next(); // phía sau lấy hàm chạy của nó   
            }
        }, 3000);
    }

    // 4. Lấy thông tin theo dõi tiến trình gửi sms trong csdl
    // kết quả trả về là json với 
    // - status = 1 là hoàn thành, 2 bắt đầu, 3 đang chạy, 5 lỗi; 
    // - description = là mô tả thông tin theo dõi tiến trình
    getSessionSms(req, res, next) {
        db.getRst(`
        select * from session_monitor
        where session_id = 2
        `)
            .then(result => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(result
                    , (key, value) => {
                        if (value === null) return undefined
                        return value
                    }
                    , 2
                ));
            })
            .catch(err => {
                console.log('Lỗi: ', err);
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    status: 'NOK',
                    message: 'Lỗi đọc thong tin session',
                    error: err
                }
                    , (key, value) => {
                        if (value === null) return undefined
                        return value
                    }
                    , 2
                ));
            })
    }


    // 5. lấy thông tin báo cáo về kỳ phát hành cước
    // dạng truyền json lên là {month: yyyy-mm, period: number}
    getReportBill(req, res, next) {

        let { month, period } = req.json_data; // req.params;

        db.getRsts(`
        SELECT bill_cycle
        , bill_cycle_id
        , (
        CASE WHEN tot_charge < 0 THEN -1 
        WHEN tot_charge < 5000 THEN 0 
        ELSE 1 
        END) report_type
        , COUNT(*) count_invoice,
        SUM(tot_charge) tot_charge
            FROM report_bill
            where bill_cycle = to_date('${month}','yyyy-mm')
            and bill_cycle_id = ${period}
            GROUP BY bill_cycle
                    , bill_cycle_id
                    , (CASE WHEN tot_charge < 0 THEN -1 WHEN tot_charge < 5000 THEN 0 ELSE 1 END)
            order by bill_cycle,bill_cycle_id, report_type
        `)
            .then(result => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(result
                    , (key, value) => {
                        if (value === null) return undefined
                        return value
                    }
                    , 2
                ));
            })
            .catch(err => {
                console.log('Lỗi: ', err);
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    status: 'NOK',
                    message: 'Lỗi đọc thông tin phát hành',
                    error: err
                }
                    , (key, value) => {
                        if (value === null) return undefined
                        return value
                    }
                    , 2
                ));
            })
    }



    // 6. trả về thông tin cước của thuê bao để tra cứu trên web
    // POST report-bill-isdn { isdn, month:yyyy-mm }
    getReportBillIsdn(req, res, next) {

        let { isdn, month } = req.json_data;

        db.getRst(`
        -- III. Tra chi tiet cuoc cua mot khach hang
        WITH
            -- SQL GOC
            charge_bill
            AS
                (SELECT *
                    FROM report_bill
                WHERE bill_cycle = TO_DATE('${month}', 'yyyy-mm') AND isdn = '${isdn}') -- cau lenh goc
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
                WHERE 	 a.month = TO_DATE('${month}', 'yyyy-mm')
                        and a.bill_cycle_id IN (SELECT bill_cycle_id FROM charge_bill)
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
                    WHERE		b.month = TO_DATE('${month}', 'yyyy-mm') 														-- thang 11
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
                    WHERE		b.month = TO_DATE('${month}', 'yyyy-mm') 														-- thang 11
                            AND b.charge_report_id IN (SELECT charge_report_id FROM charge_report)
                GROUP BY b.charge_report_id)
        ------------------------------------
        -- cau lenh lay du lieu ra de chay
        SELECT b.bill_cycle
                ,b.bill_cycle_id
                ,b.cust_id
                ,(b.end_date+1) 																									  AS iss_date
                ,'https://c3.mobifone.vn'||a.url_link as url_link
                ,																															
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
            .then(result => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(result
                    , (key, value) => {
                        if (value === null) return undefined
                        return value
                    }
                    , 2
                ));
            })
            .catch(err => {
                console.log('Lỗi: ', err);
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    status: 'NOK',
                    message: 'Lỗi đọc thông báo cước khách hàng',
                    error: err
                }
                    , (key, value) => {
                        if (value === null) return undefined
                        return value
                    }
                    , 2
                ));
            })
    }


    /**
     * 7. Lưu thông tin người dùng nhập vào chức năng phát hành thông báo cước đơn lẻ
     * SELECT   
     * a.isdn,                  -- so thue bao
     * a.request_datetime,      -- thoi gian dang ky 
     * a.request_type,          -- kieu request 'WEB' -- 
     * a.request_user_input,    -- user nhap tren web
     * a.request_status,        -- 1 = nhan TBC giay / 0 = Huy nhan TBC giay
     * a.process_status,        -- Gianh cho system
     * a.process_note           -- Gianh cho system
     * FROM request_bill a
     */
    saveReportBillIsdn(req, res, next) {

        let jsonIsdn = {
            isdn: req.json_data.isdn,                           // số thuê bao
            request_datetime: '__$sysdate',                     // ngày giờ yêu cầu được nhập lên
            request_type: 'WEB',                               // mặt định 
            request_status: req.json_data.request_status ? 1 : 0,   // trạng thái đăng ký thông báo giấy hoặc hủy
            request_user_input: req.user ? req.user.email : ''  // user đăng ký email của token
        }

        // thực hiện chức năng update bằng json
        db.insert(db.convertSqlFromJson(`request_bill`, jsonIsdn, ['isdn']))
            .then(result => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ 
                    status: "OK"
                , message: (req.json_data.request_status ? "Đăng ký nhận TBC giấy" : "Hủy nhận TBC giấy") + " thành công" 
            }
                    , (key, value) => {
                        if (value === null) return undefined
                        return value
                    }
                    , 2
                ));
            })
            .catch(err => {
                // có thể là trùng key thì cho update???
                console.log('Lỗi : ', err);
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    status: 'NOK',
                    message: 'Lỗi gọi đăng ký/hủy nhận thông báo giấy',
                    error: err
                }
                    , (key, value) => {
                        if (value === null) return undefined
                        return value
                    }
                    , 2
                ));
            })
    }


    /**
     * 8. Gọi hàm phát hành thông báo cước đơn lẻ cho thuê bao 
     * đồng thời nhắn tin đơn lẻ cho khách hàng này đường link tra cứu thông báo luôn
     */
    createReportBillIsdn(req, res, next) {

        let { isdn, month, period } = req.json_data;

        // chức năng này để hàm chạy trực tiếp trên server dưới dạng promise 
        // khi nào xong thì in ra log hoặc trả một notify cho client
        // vì việc chạy hàm này cho 200k khách hàng mất cỡ 4h
        // do vậy client không đợi kết quả ngay
        db.executeJavaFunction(`pkg_charge_report.create_bill_report_isdn`, [isdn, month, period])
            .then(data => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    status: "OK"
                    , message: data
                }
                    , (key, value) => {
                        if (value === null) return undefined
                        return value
                    }
                    , 2
                ));
            })
            .catch(err => {
                console.log('Lỗi phát hành: ', err);
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    status: 'NOK',
                    message: 'Không tìm thấy kỳ cước hoặc lỗi trong quá trình phát hành cho thuê bao!',
                    json_data: req.json_data,
                    error: err
                }
                    , null
                    , 2
                ));
            });

    }


    /**
     * Lấy thông tin dashboard theo dõi chu kỳ đã phát hành gần nhất
     * 
     */
    getDashboardReport(req, res, next) {
        db.getRsts(`
        SELECT bill_cycle_id
		  ,TO_CHAR(bill_cycle,'yyyy-mm') as bill_cycle
		  ,(CASE WHEN tot_charge < 0 THEN -1 WHEN tot_charge < 5000 THEN 0 ELSE 1 END)	AS report_type
		  ,COUNT(*) 																							AS count_invoice
		  ,SUM(tot_charge)																					AS tot_charge
        FROM report_bill
        WHERE bill_cycle IN (SELECT MAX(bill_cycle)
                                    FROM report_bill
                                    WHERE bill_cycle >= TRUNC(SYSDATE
                                                                        - 60
                                                                    ,'month'))
        GROUP BY bill_cycle_id
                ,TO_CHAR(bill_cycle,'yyyy-mm')
                ,(CASE WHEN tot_charge < 0 THEN -1 WHEN tot_charge < 5000 THEN 0 ELSE 1 END)
        ORDER BY bill_cycle, bill_cycle_id, report_type
        `)
            .then(result => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(result
                    , (key, value) => {
                        if (value === null) return undefined
                        return value
                    }
                    , 2
                ));
            })
            .catch(err => {
                console.log('Lỗi: ', err);
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    status: 'NOK',
                    message: 'Lỗi đọc thông tin phát hành',
                    error: err
                }
                    , (key, value) => {
                        if (value === null) return undefined
                        return value
                    }
                    , 2
                ));
            })
    }


}

module.exports = new EBillHandler();