"use strict"

/**
 * Bộ tương tác csdl để tạo, quản lý user, (quản lý user sử dụng hệ thống)
 */

// Kết nối csdl oracle theo pool
const db = require('../../../db/sqlite3/db-pool');
const arrObj = require('../../../utils/array-object');

const defaultOrganizationId = 3; // default tổ chức được tạo

class UserHandler {

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

    // lấy id của user phục vụ insert/update các bảng khác
    getUserId(req, res, next) {
        if (req.user)
            db.getRst(`select id from users where username='${req.user.username}'`)
                .then(result => {
                    if (result && result.id) {
                        req.user.id = result.id;
                        next()
                    } else
                        res.status(401).json({
                            message: 'User không được khai báo'
                        })
                })
                .catch(err => {
                    res.status(401).json({
                        message: 'Lỗi truy vấn csdl users'
                    })
                })
        else
            res.status(401).json({
                message: 'User không xác định'
            })

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
            organization_id: defaultOrganizationId,
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
    // lấy thông tin user
    getAllUsers(req, res, next) {
        db.select('users')
            .then(result => {
                // console.log('result: ', result);
                if (result && result.status === 0) {
                    res.status(401).json({
                        message: 'Lỗi!'
                    })
                    // res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
                    // res.end(arrObj.getJsonStringify({ status: 'NOK', message: 'User đã bị khóa, vui lòng liên hệ Quản trị hệ thống' }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(arrObj.getJsonStringify({ status: 'OK', message: 'Thành công', data: result }));
                }

            })
            .catch(err => {
                console.log('Lỗi: ', err);
                res.status(401).json({
                    message: 'Lỗi truy vấn csdl admin_users'
                })
            });
    }
}

module.exports = new UserHandler();