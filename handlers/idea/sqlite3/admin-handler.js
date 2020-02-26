"use strict"
/**
 * ver 1.0 fix quyền truy cập 
 *
 */
// const arrObj = require('../../../utils/array-object');
// const db = require('../../../db/sqlite3/db-pool');

class Handler {

    /**
     * Thiết lập chức năng dựa trên đường dẫn của get/post
     * Đường dẫn cuối sẽ là duy nhất của từng chức năng
     * ví dụ: /db/edit-customer thì edit-customer là chức năng
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    setFunctionFromPath(req, res, next) {
        //gán đường dẫn phía sau cùng để gán chức năng cho nó
        req.functionCode = req.pathName.substring(req.pathName.lastIndexOf("/") + 1);
        next();
    }

    /**
     * req.functionCode = "active" //chuc nang toi thieu la active 
     * 
     * req.functionCode = "edit-customer" //yeu cau kiem tra quyen
     * //neu khong co functionCode thi xem nhu khong can kiem tra quyen
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async checkFunctionRole(req, res, next) {

        if (req.functionCode) { 
            if (req.user && (req.user.username === "cuong.dq" || req.user.role === 99)) {
                next() // đây là user có quyền developer
                // viết thêm hàm truy vấn cấp quyền trong admin_roles nhé
            } else {
                // các user khác sẽ không được quyền này
                res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ message: 'Bạn không có quyền thực hiện chức năng này' }));
            }
        } else {
            next(); // không cần kiểm tra quyền
        }

    }
}

module.exports = new Handler();