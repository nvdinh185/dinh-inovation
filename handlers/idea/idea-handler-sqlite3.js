"use strict"

/**
 * Bộ tương tác csdl để xử lý tài nguyên ý tưởng
 */

// Kết nối csdl oracle theo pool
const db = require('../../db/sqlite3/db-pool');
const arrObj = require('../../utils/array-object');

class EBillHandler {

    // lấy thông tin user
    getUserInfo(req, res, next) {
        db.getRst(`select * from users where username='${(req.user ? req.user.username : ``)}'`)
            .then(result => {
                // console.log('result: ', result);
                if (result && result.status === 0) {
                    res.status(401).json({
                        message: 'User đã bị khóa, vui lòng liên hệ Quản trị hệ thống'
                    })
                    // res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
                    // res.end(arrObj.getJsonStringify({ status: 'NOK', message: 'User đã bị khóa, vui lòng liên hệ Quản trị hệ thống' }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(arrObj.getJsonStringify({ status: 'OK', message: 'Login thành công', data: result }));
                }

            })
            .catch(err => {
                console.log('Lỗi: ', err);
                res.status(401).json({
                    message: 'Lỗi truy vấn csdl admin_users'
                })
            });
    }

    /**
     * 1. Tạo user mới từ người dùng
     * Các thông tin cơ bản của user, không đẩy hình
     * Trường hợp đẩy hình thì upload hình ảnh trước rồi mới update user này sau
     */
    createNewUser(req, res, next) {

        const userInfo = {
            ...req.json_data,
            // các trường thông tin thêm vào
            username: req.user.username,
            status: 1,
            created_time: Date.now()
        }

        db.insert(arrObj.convertSqlFromJson("users", userInfo))
            .then(data => {
                next();
            })
            .catch(err => {
                console.log('Lỗi tạo user mới', err);
                res.status(401).json({
                    message: 'Lỗi tạo user mới, liên hệ quản trị hệ thống',
                    error: err
                })
            });

    }
    /**
     * 3. Sửa thông tin người dùng
     * Các thông tin cơ bản của user, không đẩy hình
     * Trường hợp đẩy hình thì upload hình ảnh trước rồi mới update user này sau
     */
    editUser(req, res, next) {

        const userInfo = {
            ...req.json_data,
            username: req.user.username,
            updated_time: Date.now()
        }

        db.update(arrObj.convertSqlFromJson("users", userInfo, ['username']))
            .then(data => {
                next();
            })
            .catch(err => {
                console.log('Lỗi update user', err);
                res.status(401).json({
                    message: 'Lỗi update user, liên hệ quản trị hệ thống',
                    error: err
                })
            });

    }






}

module.exports = new EBillHandler();