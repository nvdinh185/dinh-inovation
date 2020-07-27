"use strict"

const db = require('../../db/sqlite3/db-pool');
const arrObj = require('../../utils/array-object');

class UserHandler {

    // lấy thông tin user
    // dựa vào user của token
    async getUserInfo(req, res, next) {
        // console.log(req.json_data);
        let sqlWhereUser = `where username='${(req.user ? req.user.username : ``)}'`
        // kiểm tra username đã có trong csdl chưa?
        let checkUsername = await db.getRst(`select * from users ${sqlWhereUser}`);
        if (checkUsername) {
            let sqlWhere = `where username='${(req.user ? req.user.username : ``)}' and password='${(req.user ? req.user.password : ``)}'`
            let info = await db.getRst(`select * from users ${sqlWhere}`);
            // console.log(info);

            if (!info) {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify({ status: 'OK' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify({ status: 'OK', data: info }));
            }
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(arrObj.getJsonStringify({ status: 'NOK' }));
        }
    }

    // lấy id của user phục vụ insert/update các bảng khác
    getUserId(req, res, next) {
        if (req.user)
            db.getRst(`select id from users where username='${req.user.username}'`)
                .then(result => {
                    // console.log(req.user, result);
                    if (result && result.id) {
                        req.user.id = result.id;
                        next()
                    } else
                        res.status(401).json({
                            message: 'User của bạn không được khai báo'
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
     * Tạo user mới từ người dùng
     */
    createNewUser(req, res, next) {

        const userInfo = {
            ...req.json_data,
            // các trường thông tin thêm vào
            username: req.user.username,
            password: req.user.password,
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
     * Sửa thông tin người dùng
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

module.exports = new UserHandler();