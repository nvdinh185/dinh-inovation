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
            user_id: req.user.id,                // ý tưởng của user này
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

    // lấy thông tin của 1 ý tưởng trả về khi người dùng like, edit, comment
    getIdea(req, res, next) {
        db.getRst(`select * from ideas where id=${(req.ideaId ? req.ideaId : 0)}`)
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

    // like ý tưởng
    likeIdea(req, res, next) {
        // thông tin đầu vào là req.user.id 
        // và req.json_data.id chứa mã ý tưởng
        req.ideaId = req.json_data.id;
        let jsonLike = {
            user_id: req.user.id,
            ideas_id: req.ideaId,
            created_time: Date.now(),
            activities_type: 1 // like
        }

        db.getRst(`select activities_type from ideas_interactives where ideas_id=${req.ideaId} and user_id=${req.user.id}`)
            .then(async result => {
                if (result) {
                    // có tồn tại 1 bảng ghi rồi của user này chỉ được đếm 1 lần thôi
                    // nếu like thì unlike
                    if (result.activities_type !== 0) jsonLike.activities_type = 0;
                    await db.update(db.convertSqlFromJson('ideas_interactives', jsonLike, ['user_id', 'ideas_id']))
                } else {
                    await db.insert(db.convertSqlFromJson('ideas_interactives', jsonLike, ['user_id', 'ideas_id']))
                }
                // update số lượng like cho bảng gốc
                let rowCount = await db.getRst(`select count(1) as voted_count from ideas_interactives
                                                where ideas_id = ${req.ideaId}
                                                and activities_type>0`);
                await db.update(db.convertSqlFromJson("ideas", { id: req.ideaId, voted_count: rowCount.voted_count }, ["id"]))
                next()
            })
            .catch(err => {
                console.log('loi', err);
                res.status(401).json({
                    message: 'Lỗi truy vấn csdl interactives'
                })
            });
    }


    // comment ý tưởng
    commentIdea(req, res, next) {
        // thông tin đầu vào là req.user.id 
        // và req.json_data.id chứa mã ý tưởng
        req.ideaId = req.json_data.id;
        let jsonComment = {
            user_id: req.user.id,
            ideas_id: req.ideaId,
            content: req.json_data.content,
            created_time: Date.now()
        }
        db.insert(db.convertSqlFromJson('ideas_comments', jsonComment, []))
            .then(async result => {
                // console.log('kq',result);
                // update số lượng comment cho bảng gốc
                let rowCount = await db.getRst(`select 
                                count(distinct user_id) as commented_count 
                                from ideas_comments
                                where ideas_id = ${req.ideaId}
                                and parent_id is null`);
                await db.update(db.convertSqlFromJson("ideas", { id: req.ideaId, commented_count: rowCount.commented_count }, ["id"]))
                next()
            })
            .catch(err => {
                res.status(401).json({
                    message: 'Lỗi tạo comment'
                })
            });
    }




}

module.exports = new IdeaHandler();