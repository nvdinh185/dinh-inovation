"use strict"

/**
 * Bộ tương tác csdl để xử lý tài nguyên ý tưởng
 */

// Kết nối csdl oracle theo pool
const db = require('../../../db/sqlite3/db-pool');
const arrObj = require('../../../utils/array-object');

class IdeaHandler {

    // 1. lấy thông tin ý tưởng
    getIdeas(req, res, next) {
        db.getRsts(`select * from ideas order by changed_time desc, created_time desc`)
            .then(result => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify(result));
            })
            .catch(err => {
                // console.log('Lỗi: ', err);
                res.status(401).json({
                    message: 'Lỗi truy vấn csdl getIdeaInfo'
                })
            });
    }

    /**
     * 2. Tạo ý tưởng mới
     */
    createIdea(req, res, next) {

        const ideaInfo = {
            ...req.json_data,
            // các trường thông tin thêm vào
            changed_username: req.user.username,
            created_time: Date.now()
        }

        db.insert(arrObj.convertSqlFromJson("ideas", ideaInfo))
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
     * 3. sửa thông tin ý tưởng
     */
    editIdea(req, res, next) {

        const ideaInfo = {
            ...req.json_data,
            // thêm trường
            changed_username: req.user.username,
            changed_time: Date.now()
        }

        db.update(arrObj.convertSqlFromJson("ideas", ideaInfo, ['id']))
            .then(data => {
                req.ideaId = ideaInfo.id;
                next();
            })
            .catch(err => {
                // console.log('Lỗi update user', err);
                res.status(401).json({
                    message: 'Lỗi update idea, liên hệ quản trị hệ thống',
                    error: err
                })
            });

    }

}

module.exports = new IdeaHandler();