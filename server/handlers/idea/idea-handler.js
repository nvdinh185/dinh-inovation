"use strict"

/**
 * Bộ xử lý tương tác cơ sở dữ liệu để lấy kết quả cho client cho chức năng quản trị phát hành
 */

// Kết nối csdl oracle theo pool
const db = require('../../db/oracle/db-pool');

class EBillHandler {
    
    /**
     * 1. Tạo user mới từ người dùng
     * Các thông tin cơ bản của user, không đẩy hình
     * Trường hợp đẩy hình thì upload hình ảnh trước rồi mới update user này sau
     */
    createUser(req, res, next) {

        const userInfo = {
            ...req.json_data,
            // các trường thông tin thêm vào
            created_time: Date.now()
        }
    }

    


}

module.exports = new EBillHandler();