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
        db.getRsts(`select 
                        d.fullname || '(' || d.nickname || ')' as username
                        , c.name as status_name
                        , b.name as category_name
                        , a.* 
                        from ideas a
                        left join ideas_categories b
                        on a.category_id = b.id
                        left join ideas_statuses c
                        on a.status = c.id
                        left join users d
                        on a.user_id = d.id
                    order by a.changed_time desc, a.created_time desc`)
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
    async getIdea(req, res, next) {

        // lấy ý tưởng chi tiết ra
        let ideaId = req.paramS.id || req.ideaId || 0;
        try {
            let idea = await db.getRst(`with 
                            ideas_selected as
                            (select * from ideas where id = ${ideaId})
                        select 
                            d.fullname || '(' || d.nickname || ')' as username
                            , d.avatar
                            , c.name as status_name
                            , b.name as category_name
                            , a.* 
                            from ideas_selected a
                            left join ideas_categories b
                            on a.category_id = b.id
                            left join ideas_statuses c
                            on a.status = c.id
                            left join users d
                            on a.user_id = d.id
                        order by a.changed_time desc, a.created_time desc
                    `);

            let likes = await db.getRsts(`with 
                                likes_idea as
                                (select * from ideas_interactives
                                where idea_id  = ${ideaId}
                                order by created_time desc)
                                select 
                                b.fullname || '(' || b.nickname || ')' as username
                                , b.avatar
                                , a.* 
                            from likes_idea a
                            left join users b
                            on a.user_id = b.id`);

            let comments = await db.getRsts(`with 
                                comments_ideas as
                                (select * from ideas_comments
                                where idea_id = ${ideaId}
                                order by created_time desc)
                                select 
                                b.fullname || '(' || b.nickname || ')' as username
                                , b.avatar
                                , a.* 
                            from comments_ideas a
                            left join users b
                            on a.user_id = b.id`);

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(arrObj.getJsonStringify({
                idea,
                likes,
                comments
            }));

        } catch (err) {
            res.status(401).json({
                message: 'Lỗi update idea, liên hệ quản trị hệ thống',
                error: err
            })
        }



    }

    // like ý tưởng
    likeIdea(req, res, next) {
        // thông tin đầu vào là req.user.id 
        // và req.json_data.id chứa mã ý tưởng
        req.ideaId = req.json_data.id;
        let jsonLike = {
            user_id: req.user.id,
            idea_id: req.ideaId,
            created_time: Date.now(),
            activities_type: 1 // like
        }

        db.getRst(`select activities_type from ideas_interactives where idea_id=${req.ideaId} and user_id=${req.user.id}`)
            .then(async result => {
                if (result) {
                    // có tồn tại 1 bảng ghi rồi của user này chỉ được đếm 1 lần thôi
                    // nếu like thì unlike
                    if (result.activities_type !== 0) jsonLike.activities_type = 0;
                    await db.update(db.convertSqlFromJson('ideas_interactives', jsonLike, ['user_id', 'idea_id']))
                } else {
                    await db.insert(db.convertSqlFromJson('ideas_interactives', jsonLike, ['user_id', 'idea_id']))
                }
                // update số lượng like cho bảng gốc
                let votedUsers = await db.getRsts(`select distinct user_id as user_id
                                                    from ideas_interactives
                                                    where idea_id = ${req.ideaId}
                                                    and activities_type>0`);
                votedUsers = votedUsers.map(o => o["user_id"]);
                await db.update(db.convertSqlFromJson("ideas", { id: req.ideaId, voted_count: votedUsers.length, voted_users: JSON.stringify(votedUsers) }, ["id"]))
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
            idea_id: req.ideaId,
            content: req.json_data.content,
            created_time: Date.now()
        }
        db.insert(db.convertSqlFromJson('ideas_comments', jsonComment, []))
            .then(async result => {
                let commentedUsers = await db.getRsts(`select 
                                                        distinct user_id as user_id 
                                                        from ideas_comments
                                                        where idea_id = ${req.ideaId}
                                                        and parent_id is null`);
                commentedUsers = commentedUsers.map(o => o["user_id"]);
                await db.update(db.convertSqlFromJson("ideas", { id: req.ideaId, commented_count: commentedUsers.length, commented_users: JSON.stringify(commentedUsers) }, ["id"]))
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