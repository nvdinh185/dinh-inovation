"use strict"

const db = require('../../db/sqlite3/db-pool');
const arrObj = require('../../utils/array-object');

const orderList = {
    ORDER_CREATED: 'ORDER_CREATED'   // được tạo ra gần đây nhất
    , ORDER_LIKES: 'ORDER_LIKES'       // được yêu thích nhất
    , ORDER_COMMENTS: 'ORDER_COMMENTS' // được nhiều người bình luận nhất
    , ORDER_MARKS: 'ORDER_MARKS'       // được chấm điểm cao nhất của mọi người
}

/**
 * Lưu file chọn trong ý tưởng vào csdl
 * @param {*} files 
 * @param {*} userId 
 */
const saveAttachFiles = (files, userId) => {
    return new Promise(async resolve => {
        let fileIds;
        // so luong file > 0
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
                await db.insert(db.convertSqlFromJson('ideas_attachs', jsonFileAttach))
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

    // 1. lấy danh sách ý tưởng hiển thị
    getIdeas(req, res, next) {

        let { order_by, filter_category, filter_status, page_size, page } = req.paramS;
        let orderBy = `order by IFNULL(a.changed_time, a.created_time) desc`;

        if (orderList[order_by] === orderList.ORDER_CREATED)
            orderBy = `order by a.created_time desc`;

        if (orderList[order_by] === orderList.ORDER_COMMENTS)
            orderBy = `order by a.commented_count desc`;

        if (orderList[order_by] === orderList.ORDER_LIKES)
            orderBy = `order by a.voted_count desc`;

        if (orderList[order_by] === orderList.ORDER_MARKS)
            orderBy = `order by a.total_point desc`

        let filterCategory = filter_category ? filter_category.split(",") : [];
        let filterStatus = filter_status ? filter_status.split(",") : [];

        let sqlCategory = filterCategory.length > 0 ? `and a.category_id in (${filterCategory.toString()})` : ``
        let sqlStatus = filterStatus.length > 0 ? `and a.status in (${filterStatus.toString()})` : ``
        // console.log(sqlCategory, sqlStatus, orderBy);
        db.getRsts(`select
                    b.background
                    , a.*
                    from ideas a
                    join ideas_categories b
                    on a.category_id = b.id
                    where a.status != 0 -- chỉ lấy những ý tưởng còn hiệu lực
                    ${sqlCategory}
                    ${sqlStatus}
                    ${orderBy}
                    LIMIT ${(page_size ? page_size : 3)}
                    OFFSET ${(page ? page * (page_size ? page_size : 3) : 0)}
                    `)
            .then(result => {
                // console.log('result: ', result);
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify(result));
            })
            .catch(err => {
                console.log('Lỗi: ', err);
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

        // xóa cột đếm file nếu có
        delete ideaInfo["count_file"];

        db.insert(arrObj.convertSqlFromJson("ideas", ideaInfo))
            .then(data => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify({ status: "OK", message: "Tạo mới thành công" }));
            })
            .catch(err => {
                console.log('Lỗi tạo ý tưởng mới', err);
                res.status(401).json({
                    message: 'Lỗi tạo ý tưởng mới, liên hệ quản trị hệ thống',
                    error: err
                })
            });

    }

    /**
     * 3. sửa thông tin ý tưởng, không xử lý sửa file đính kèm
     */
    async editIdea(req, res, next) {
        // console.log(req.json_data);
        const ideaInfo = {
            ...req.json_data,
            // thêm trường
            changed_username: req.user.username,
            changed_time: Date.now()
        }

        // xóa cột đếm file nếu có
        delete ideaInfo["count_file"];

        db.update(arrObj.convertSqlFromJson("ideas", ideaInfo, ['id']))
            .then(data => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify({ status: "OK", message: "Sửa thành công" }));
            })
            .catch(err => {
                console.log('Lỗi update idea', err);
                res.status(401).json({
                    message: 'Lỗi update idea, liên hệ quản trị hệ thống',
                    error: err
                })
            });
    }

    async delIdea(req, res, next) {
        // console.log(req.json_data);
        let idIdea = req.json_data.id;
        // Lấy danh sách file (nếu có)
        let attach_list = await db.getRst(`select attach_id_list from ideas where id = ${idIdea}`)
        let list_id = attach_list.attach_id_list ? attach_list.attach_id_list.toString() : '()'
        list_id = list_id.replace('[', '(').replace(']', ')')
        try {
            await db.getRsts(`delete from ideas_attachs where id in ${list_id}`);
            await db.getRsts(`delete from ideas_comments where idea_id = ${idIdea}`);
            await db.getRsts(`delete from ideas_interactives where idea_id = ${idIdea}`);
            await db.getRsts(`delete from ideas_marks where idea_id = ${idIdea}`);
            await db.getRsts(`delete from ideas where id = ${idIdea}`);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(arrObj.getJsonStringify({ status: "OK", message: "Xóa thành công" }));
        } catch (err) {
            res.status(401).json({
                message: 'Lỗi update idea, liên hệ quản trị hệ thống',
                error: err
            })
        }
    }

    // lấy thông tin của 1 ý tưởng
    async getIdea(req, res, next) {

        // lấy ý tưởng chi tiết ra
        let ideaId = req.paramS.id || req.ideaId;
        try {
            let idea = await db.getRst(`select
                                        b.background
                                        , b.name as category_name
                                        , c.name as status_name
                                        , d.fullname || '(' || d.nickname || ')' as username
                                        ,  d.avatar
                                        , a.*
                                        from ideas a
                                        join ideas_categories b
                                        on a.category_id = b.id
                                        join ideas_statuses c
                                        on a.status = c.id
                                        join users d
                                        on a.user_id = d.id
                                        where a.id = ${ideaId}
                                        `);

            let likes = await db.getRsts(`select * 
                                from ideas_interactives
                                where idea_id = ${ideaId}
                                `);

            let comments = await db.getRsts(`select
                                            b.fullname || '(' || b.nickname || ')' as username
                                            , b.avatar
                                            , a.* 
                                            from ideas_comments a
                                            join users b
                                            on a.user_id = b.id
                                            where idea_id = ${ideaId}
                                            `);

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(arrObj.getJsonStringify({
                idea,
                likes,
                comments
            }));

        } catch (err) {
            console.log(err);
            res.status(401).json({
                message: 'Lỗi lấy chi tiết ý tưởng',
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
                    // có tồn tại 1 bản ghi của user này rồi
                    // nếu đã like thì unlike
                    if (result.activities_type !== 0) jsonLike.activities_type = 0;
                    await db.update(db.convertSqlFromJson('ideas_interactives', jsonLike, ['user_id', 'idea_id']))
                } else {
                    // chèn thêm một dòng like vào bảng ideas_interactives
                    await db.insert(db.convertSqlFromJson('ideas_interactives', jsonLike))
                }
                //Mảng những user đã voted cho ý tưởng này
                let votedUsers = await db.getRsts(`select user_id
                                                    from ideas_interactives
                                                    where idea_id = ${req.ideaId}
                                                    and activities_type > 0`); //[ { user_id: 1 }, { user_id: 2 } ]
                votedUsers = votedUsers.map(o => o["user_id"]);//[ 1, 2 ]
                // update số lượng like cho bảng gốc
                await db.update(db.convertSqlFromJson("ideas", { id: req.ideaId, voted_count: votedUsers.length, voted_users: JSON.stringify(votedUsers) }, ["id"]))
                next()
            })
            .catch(err => {
                console.log('loi', err);
                res.status(401).json({
                    message: 'Lỗi trong quá trình like'
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
        db.insert(db.convertSqlFromJson('ideas_comments', jsonComment))
            .then(async result => {
                let commentedUsers = await db.getRsts(`select 
                                                        distinct user_id as user_id 
                                                        from ideas_comments
                                                        where idea_id = ${req.ideaId}
                                                        `);
                commentedUsers = commentedUsers.map(o => o["user_id"]);
                await db.update(db.convertSqlFromJson("ideas", { id: req.ideaId, commented_count: commentedUsers.length, commented_users: JSON.stringify(commentedUsers) }, ["id"]))
                next()
            })
            .catch(err => {
                console.log('Lỗi tạo comment:', err);
                res.status(401).json({
                    error: err,
                    message: 'Lỗi tạo comment'
                })
            });
    }

    // chấm điểm ý tưởng
    async markIdea(req, res, next) {
        if (req.json_data && req.json_data.id && req.user.id) {
            let arrMarks = [];

            // Đưa các dữ liệu chấm điểm vào mảng arrMarks
            for (const key in req.json_data) {
                if (key && key.indexOf("question") === 0) {
                    try {
                        let question_id = parseInt(key.split("_").pop());// lấy id của câu hỏi
                        arrMarks.push({
                            idea_id: req.json_data.id,
                            question_id: question_id,
                            user_id: req.user.id,
                            point: req.json_data[key],
                            created_time: Date.now()
                        })
                    } catch { }
                }
            }

            let insertMarkPromise = new Promise(resolve => {
                let count = 0;
                // Duyệt từng phần tử và lưu đánh giá từng câu hỏi
                arrMarks.forEach(async el => {
                    // console.log(db.convertSqlFromJson('ideas_marks', el));
                    try {
                        await db.insert(db.convertSqlFromJson('ideas_marks', el));
                        // console.log(123);
                    } catch (err) {
                        // console.log(err);
                        if (err.code === 'SQLITE_CONSTRAINT') {
                            try {
                                delete el['created_time'];
                                el.updated_time = Date.now();
                                await db.update(db.convertSqlFromJson('ideas_marks', el, ['idea_id', 'question_id', 'user_id']))
                            } catch { }
                        }
                    } finally {
                        count++;
                        if (count === arrMarks.length) {
                            resolve("Finish")
                        }
                    }
                })
            })

            insertMarkPromise.then(async data => {
                let row = await db.getRst(`with 
                                                -- Lấy một ý tưởng cho đánh giá    
                                                mark_group as (
                                                    select 	a.user_id,
                                                            sum(a.point*b.weight)/sum(b.weight) as total_point
                                                    from ideas_marks as a
                                                    left join ideas_questions as b
                                                    on a.question_id = b.id
                                                    where a.idea_id = ${req.json_data.id}
                                                    group by a.user_id),

                                                -- Lấy một ý tưởng cho đánh giá
                                                user_point_weight as (
                                                    select 	a.user_id,
                                                            b.role,
                                                            (CASE b.role
                                                                WHEN 2 THEN 3
                                                                WHEN 3 THEN 2
                                                                WHEN 0 THEN 0
                                                                ELSE 1
                                                            END) as weight,
                                                            a.total_point
                                                    from mark_group as a, users as b
                                                    where a.user_id = b.id
                                                )

                                            -- Menh de chinh de lay du lieu
                                            select sum(total_point*weight)/sum(weight) as total_point 
                                            from user_point_weight`);
                db.update(db.convertSqlFromJson("ideas", { id: req.json_data.id, total_point: row.total_point }, ["id"]))
                    .then(result => {
                        // console.log(123);
                        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(arrObj.getJsonStringify({ status: "OK", message: "Đánh giá thành công" }));
                    }).catch(err => {
                        res.status(401).json({
                            message: 'Lỗi không cập nhập điểm tổng được!'
                        })
                    })
            })
        } else {
            res.status(401).json({
                message: 'Lỗi không có thông tin hợp lệ!'
            })
        }
    }

    // lấy thông tin chấm điểm ý tưởng
    getUserMarkIdea(req, res, next) {
        db.getRsts(`select * from ideas_marks
                    where user_id = ${req.user.id}
                    and idea_id = ${req.paramS.id}
                    `)
            .then(data => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify(data));
            })
            .catch(err => {
                res.status(401).json({
                    message: 'Lỗi lấy user chấm điểm ý tưởng'
                })
            })
    }

}

module.exports = new IdeaHandler();