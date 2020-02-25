"use strict"

/**
 * Bộ tương tác csdl để xử lý tài nguyên ý tưởng
 */

// Kết nối csdl oracle theo pool
const db = require('../../../db/sqlite3/db-pool');
const arrObj = require('../../../utils/array-object');


/* const returnErrorMessage = (res, err, message) => {
    res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
        status: 'NOK'
        , error: err
        , message: message
    }, null, 2));
} */

/**
 * 
 * @param {*} files 
 * @param {*} userId 
 */
const saveAttachFiles = (files, userId) => {
    return new Promise(async (resolve, reject) => {
        let fileIds;
        // so luong file >0
        let filePaths = [];
        for (let key in files) {
            filePaths.push(files[key].path_name);
            let jsonFileAttach = {
                file_name: files[key].file_name
                , file_type: files[key].file_type
                , file_size: files[key].file_size
                , file_path: files[key].path_name
                , created_time: Date.now()
                , user_id: userId
            }
            try {
                await db.insert(db.convertSqlFromJson('ideas_attachs', jsonFileAttach, []))
            } catch{ }
        }
        try {
            // lấy tất cả các id của các file chèn vào csdl rồi
            let fileRows = await db.getRsts(`select id from ideas_attachs where file_path in ('${filePaths.join("', '")}')`)
            fileIds = fileRows.map(o => o["id"])
        } catch{ }
        resolve(fileIds)
    })

}

class IdeaHandler {

    // 1. lấy thông tin ý tưởng
    getIdeas(req, res, next) {
        db.getRsts(`select 
                        d.fullname || '(' || d.nickname || ')' as username
                        , c.name as status_name
                        , b.name as category_name
                        , b.background
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
    async createIdea(req, res, next) {

        let fileIds;
        if (req.form_data.params.count_file > 0) {
            fileIds = await saveAttachFiles(req.form_data.files, req.user.id)
        }

        const ideaInfo = {
            ...req.form_data.params,
            // các trường thông tin thêm vào
            attach_id_list: fileIds ? JSON.stringify(fileIds) : undefined,
            user_id: req.user.id,                // ý tưởng của user này
            changed_username: req.user.username,
            created_time: Date.now()
        }

        // xóa cột gia tăng file nếu có
        delete ideaInfo["count_file"];

        db.insert(arrObj.convertSqlFromJson("ideas", ideaInfo))
            .then(data => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify({ status: "OK", message: "Tạo mới thành công" }));
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
    async editIdea(req, res, next) {

        let fileIds;
        if (req.form_data.params.count_file > 0) {
            fileIds = await saveAttachFiles(req.form_data.files, req.user.id)
        }

        // Phải lấy danh sách attach file cũ sẵn có nữa mới đủ
        // nếu không sẽ bị mất file cũ liên kết với nó

        const ideaInfo = {
            ...req.form_data.params,
            // thêm trường
            // attach_id_list: fileIds ? JSON.stringify(fileIds) : undefined,
            changed_username: req.user.username,
            changed_time: Date.now()
        }

        // xóa cột gia tăng file nếu có
        delete ideaInfo["count_file"];

        db.update(arrObj.convertSqlFromJson("ideas", ideaInfo, ['id']))
            .then(data => {
                req.ideaId = ideaInfo.id;
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify({ status: "OK", message: "Sửa thành công" }));
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
    async commentIdea(req, res, next) {
        // thông tin đầu vào là req.user.id 
        // và req.form_data.params.id chứa mã ý tưởng
        // console.log('form', req.form_data);

        let fileIds;
        if (req.form_data.params.count_file > 0) {
            fileIds = await saveAttachFiles(req.form_data.files, req.user.id)
        }

        req.ideaId = req.form_data.params.id;
        let jsonComment = {
            user_id: req.user.id,
            idea_id: req.ideaId,
            content: req.form_data.params.content,
            attach_id_list: fileIds ? JSON.stringify(fileIds) : undefined,
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
                    error: err,
                    message: 'Lỗi tạo comment'
                })
            });
    }


    // đánh giá ý tưởng
    async markIdea(req, res, next) {
        // next()
        res.status(401).json({
            message: 'Lỗi chưa thể chấm điểm được'
        })
    }

    // xóa bỏ ý tưởng
    trashIdea(req, res, next) {
        // next()
        // returnErrorMessage(res, { code: 11 }, 'Lỗi xóa ý tưởng')
        res.status(401).json({
            message: 'Lỗi cập nhập loại ý tưởng'
        })
    }



}

module.exports = new IdeaHandler();