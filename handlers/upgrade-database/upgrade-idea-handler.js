"use strict"
/**
 * Bộ xử lý chạy trực tiếp các lệnh nâng cấp csdl
 * Đưa trực tiếp lệnh sql lên csdl, thực thi và trả kết quả về
 * Chỉ có quyền dev mới thực hiện chức năng này
 * 
 * version 1.0 ngày 04/11/2019
 * 
 */

const db = require('../../db/sqlite3/db-pool');

/**
 * Khai báo các hàm tương tác với csdl
 * Lấy các tham số đầu vào từ req.json_data, req.paramS, req.form_data, req.user
 * Thực hiện chuyển đổi dữ liệu sang các câu lệnh sql tương thích với csdl
 * Và gọi đối tượng db. để thực thi với csdl
 * 
 */

const saveLog = (json) => {
    db.insert(db.convertSqlFromJson('sql_logs', json, []))
        .then(data => {
            // console.log('Data: ', data);
        })
        .catch(err => {
            // console.log('Lỗi: ', err);
        });
}

class Handler {

    /**
     * Chỉ cho phép phương thức post mới thực thi nhé
     * truyền lên câu select hoặc dll
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    upgradeDatabase(req, res, next) {

        let sql = req.json_data ? req.json_data.sql : undefined;
        let isSelect = sql ? (sql.trimStart().search(/select/i) === 0 || sql.trimStart().search(/with/i) === 0) : false; //req.json_data ? req.json_data.select : false;

        if (sql) {
            // tạo câu lệnh json để lưu log
            let jsonLog = {
                user_id: req.user.id,
                created_time: Date.now(),
                sql: sql,
                type: 0,
                status: 0
            }

            if (isSelect) {
                db.getRsts(sql)
                    .then(results => {
                        jsonLog.status = 1;

                        saveLog(jsonLog);
                        // câu này thực thi được nên lưu lại lịch sử để dùng sau
                        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify(results
                            , (key, value) => {
                                // if (value === null) { return undefined; }
                                return value;
                            }
                            , 2
                        ));
                    })
                    .catch(err => {
                        jsonLog.status = 0;
                        
                        saveLog(jsonLog);

                        res.writeHead(435, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify({ error: err, message: 'Lỗi thực thi sql' }
                            , (key, value) => {
                                if (value === null) { return undefined; }
                                return value;
                            }
                            , 2
                        ));
                    })
            } else {
                jsonLog.type = 1;
                db.runSql(sql)
                    .then(excuted => {

                        jsonLog.status = 1;
                        // câu này thực thi được nên lưu lại lịch sử để xem log
                        saveLog(jsonLog);

                        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify({ status: 'OK', message: excuted }
                            , (key, value) => {
                                if (value === null) { return undefined; }
                                return value;
                            }
                            , 2
                        ));
                    })
                    .catch(err => {
                        jsonLog.status = 0;
                        saveLog(jsonLog);
                        res.writeHead(435, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify({ error: err, message: 'Lỗi thực thi sql' }
                            , (key, value) => {
                                if (value === null) { return undefined; }
                                return value;
                            }
                            , 2
                        ));
                    })
            }

        } else {
            // thực thi nâng cấp csdl
            res.writeHead(435, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'No SQL input', message: 'Không có câu lệnh upgrade nào thực thi' }
                , (key, value) => {
                    if (value === null) { return undefined; }
                    return value;
                }
                , 2
            ));
        }
    }

}

module.exports = new Handler()