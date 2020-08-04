"use strict"

// Kết nối csdl theo pool
const db = require('../../db/sqlite3/db-pool');
const arrObj = require('../../utils/array-object');
const fs = require('fs');

class ListHandler {

    // lấy thông tin danh mục phân loại ý tưởng, và danh mục giai đoạn ý tưởng
    async getListParameters(req, res, next) {
        let Parameters = {}
        try {
            Parameters.ideas_categories = await db.getRsts(`select a.id as value, a.* from ideas_categories a order by order_1, id`)
            Parameters.ideas_statuses = await db.getRsts(`select a.id as value, a.* from ideas_statuses a order by order_1, id`)
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(arrObj.getJsonStringify(Parameters));
        } catch (e) {
            res.status(401).json({
                message: 'Lỗi truy vấn getListParameters'
            })
        }
    }

    // lấy danh sách câu hỏi
    getQuestions(req, res, next) {
        db.getRsts(`SELECT * FROM ideas_questions
                    order by order_1`)
            .then(result => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify(result));
            })
            .catch(err => {
                // console.log(err);
                res.status(401).json({
                    message: 'Lỗi truy vấn getQuestions'
                })
            });
    }

    // lấy các đường dẫn file đính kèm
    // trường hợp các ý tưởng hoặc comment có truyền lên file
    async getIdeasAttachs(req, res, next) {
        try {
            let ids = (req.paramS.id_list ? JSON.parse(req.paramS.id_list) : 0);
            let listString = ids.toString();
            let images = await db.getRsts(`select id, file_name, file_type
                                            from ideas_attachs
                                            where id in (${listString})
                                            and file_type like 'image%'
                                            `)
            let files = await db.getRsts(`select id, file_name, file_type 
                                            from ideas_attachs 
                                            where id in (${listString})
                                            and file_type not like 'image%'
                                            `)
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(arrObj.getJsonStringify({ images, files }));
        } catch (err) {
            res.status(401).json({
                error: err,
                message: 'Lỗi đọc danh sách file'
            })
        }

    }

    // trả về file cho client hiển thị ra
    // trường hợp người dùng chọn mở file có id đính kèm
    async getFileAttach(req, res, next) {
        let id = req.paramS.id ? req.paramS.id : 0;
        try {
            let file = await db.getRst(`select file_path, file_type from ideas_attachs where id=${id}`);
            // console.log('Data: ', file);
            fs.readFile(file.file_path, { flag: 'r' }, function (error, data) {
                if (!error) {
                    res.writeHead(200, { 'Content-Type': file.file_type });
                    res.end(data);
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end("No file to read!");
                }
            });
        } catch (err) {
            res.status(401).json({
                error: err,
                message: 'Lỗi đọc file'
            })
        }

    }

}

module.exports = new ListHandler();