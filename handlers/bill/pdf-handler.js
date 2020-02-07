
const vnHandler = require('../../utils/vietnamese-handler');
const arrObj = require('../../utils/array-object');

const PDFDocument = require('pdfkit');
const PDFUtil = require('../../utils/pdf-util')
const db = require('../../db/oracle/db-pool-dev');
const fs = require('fs');

// đường dẫn gốc để đọc file tuyệt đối sau khi phát hành
const dirRoute = __dirname.substring(0, __dirname.length - 13);

// đường dẫn lưu file pdf đã phát hành
const dirReport = 'pdf-output';
if (!fs.existsSync(dirReport)) fs.mkdirSync(dirReport);

class PdfHandler {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    createPdf(req, res, next) {
        if (req.pdfPath) {
            fs.readFile(dirRoute + req.pdfPath, { flag: 'r' }, (err, bufferPdf) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(JSON.stringify(err));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/pdf; charset=utf-8' });
                    res.end(bufferPdf);
                }
            });
        } else if (req.userBill) {
            // tạo file pdf từ dữ liệu
            // ký file pdf, lưu xuống đĩa
            // trả đọc trả file về cho client
            /* 
            let stream = createPdf(req.userBill, outputFilename);

            stream.on('finish', () => {
                fs.readFile(outputFilename, { flag: 'r' }, (err, bufferPdf) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.end(JSON.stringify(err));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/pdf; charset=utf-8' });
                        res.end(bufferPdf);
                    }
                });
            }); 

            */

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('Đây là kết quả trả về từ req.userBill');


        } else {
            // Truy vấn của bạn không hợp lệ
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(JSON.stringify({ message: 'Tham số không phù hợp', error: 'Lỗi không biết bạn muốn gì? có phải hacker không nữa!' }));
        }

    }
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    createPdfV2(req, res, next) {
        const pdfLink = req.originalUrl
        db.getRst(`select * from ReportBill where LINK_PDF = '${pdfLink}'`)
            .then(data => {
                console.log('xyz: ', data)
                if (data) {
                    let fileName = pdfLink.slice(20).split('/').join('_')
                    const pdfData = {
                        ...data,
                        unit: 'VND'
                    }
                    const options = {
                        config: {
                            matrix_point: {
                                max_row: 60, //so luong dong
                                max_col: 10, // so luong cot
                                zipper_row: 20, //khoang cach giua 2 dong
                                zipper_col: 60 //khoang cach giua 2 cot
                            },
                            background: {
                                image: 'templates/TO_PHOI_MOBIFONE_3_11.2019_mtruoc.jpg',
                                left: -5,
                                top: -3,
                                width: 610,
                                height: 845
                            },
                            page_config: {
                                size: 'A4',
                                margin: 0,
                                layout: 'portrait'
                            },
                            text_config: {
                                size: 12,
                                color: 'black',
                            },
                            title: fileName
                        },
                        list_data: [
                            pdfData
                        ],
                        mask: {
                            end_date: { col: 180, row: 130, align: 'center', width: 100 },
                            cust_code: { col: 280, row: 130, align: 'center', width: 100 },
                            tot_charge: { col: 380, row: 130, align: 'center', width: 100 },
                            unit: { col: 480, row: 130, align: 'center', width: 100 },
                            cust_name: { col: 285, row: 160 },
                            address: { col: 190, row: 185 },
                            isdn: { col: 190, row: 210 },
                            sta_date: { col: 200, row: 240 },
                            package_charge: { col: 440, row: 278, align: 'right', width: 140 },
                            fee_charge: { col: 440, row: 293, align: 'right', width: 140 },
                            nat_charge: { col: 440, row: 328, align: 'right', width: 140 },
                            int_charge: { col: 440, row: 346, align: 'right', width: 140 },
                            voice_rmqt_charge: { col: 440, row: 379, align: 'right', width: 140 },
                            sms_rmqt_charge: { col: 440, row: 394, align: 'right', width: 140 },
                            gprs_rmqt_charge: { col: 440, row: 410, align: 'right', width: 140 },
                            vas_charge: { col: 440, row: 431, align: 'right', width: 140 },
                            prom_amount: { col: 440, row: 449, align: 'right', width: 140 },
                            current_charge: { col: 440, row: 470, align: 'right', width: 140 },
                            tax_charge: { col: 440, row: 483, align: 'right', width: 140 },
                            total_current_charge: { col: 440, row: 500, align: 'right', width: 140 },
                            adjustment: { col: 440, row: 520, align: 'right', width: 140 },
                            prior_debit: { col: 440, row: 535, align: 'right', width: 140 },
                        }
                    }

                    PDFUtil.createPdf(options, `pdf-output/${fileName}.pdf`)
                    res.status(200).send('success !')

                }
                else {
                    throw 'not found'
                }
            })
            .catch(err => {
                console.log(err)
                res.status(400).send(err)
            })

    }
}


module.exports = new PdfHandler()