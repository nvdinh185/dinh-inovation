"use strict"

/**
 * Bộ tương tác lấy các danh mục dùng chung cho văn phòng ý tưởng
 * Các danh mục trả về dưới dạng đối tượng
 */

// Kết nối csdl oracle theo pool
const db = require('../../../db/sqlite3/db-pool');
const arrObj = require('../../../utils/array-object');
const fs = require('fs');
// const mime = require('mime-types');
// const systempath = require('path');

class ListHandler {

    // lấy thông tin danh mục phân loại ý tưởng, và danh mục giai đoạn ý tưởng
    getListParameters(req, res, next) {
        const getListPromise = new Promise(async (resolve, reject) => {
            let Parameters = {}
            try {
                Parameters.ideas_categories = await db.getRsts(`select a.id as value, a.* from ideas_categories a where status is null order by order_1, id`)
                Parameters.ideas_status_type = await db.getRsts(`select a.id as value, a.* from ideas_status_type a where status is null order by order_1, id`)
                Parameters.ideas_statuses = await db.getRsts(`select a.id as value, a.* from ideas_statuses a where status is null order by order_1, id`)
            } catch (e) {
                console.log(arrObj.getTimestamp(), 'Lỗi lấy danh mục', e);
                reject(e)
            }

            resolve(Parameters)

        })

        getListPromise
            .then(result => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify(result));
            })
            .catch(err => {
                res.status(401).json({
                    message: 'Lỗi truy vấn csdl getListParameters'
                })
            });
    }

    // lấy danh sách người dùng tích cực
    getActionsList(req, res, next) {
        db.getRsts(`with 
                    users_origin as
                    (select 
                        id as user_id
                        , username
                        , fullname
                        , nickname
                        , avatar
                    from users
                    ),
                    users_ideas as
                    (select 
                        user_id
                        , count(1) as count_ideas 
                    from ideas
                    group by user_id),
                    users_voted as
                    (select 
                        user_id
                        , count(1) as count_voted
                    from ideas_interactives
                    group by user_id),
                    users_commented as
                    (select 
                        user_id
                        , count(1) as count_commented
                        , count(distinct idea_id) as count_commented_ideas 
                    from ideas_comments
                    group by user_id)
                    select a.* 
                        , ifnull(b.count_ideas,0) as count_ideas
                        , ifnull(c.count_voted,0) as count_voted
                        , ifnull(d.count_commented,0) as count_commented
                        , ifnull(d.count_commented_ideas,0) as count_commented_ideas
                        , (ifnull(count_ideas,0) * 7 + ifnull(count_commented_ideas,0) * 5 + ifnull(count_commented,0) * 3 + ifnull(count_voted,0)) as total_action
                    from users_origin a
                    left join users_ideas b
                    on  a.user_id = b.user_id
                    left join users_voted c
                    on  a.user_id = c.user_id
                    left join users_commented d
                    on  a.user_id = d.user_id
                    order by total_action desc
                    LIMIT 10
					OFFSET 0
                    `)
            .then(result => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify(result));
            })
            .catch(err => {
                res.status(401).json({
                    message: 'Lỗi truy vấn csdl getListParameters'
                })
            });
    }

    // lấy danh sách tất cả người dùng tích cực
    getAllUserActions(req, res, next) {
        db.getRsts(`with
                    users_origin as
                                (select 
                                    id as user_id
                                    , username
                                    , fullname
                                    , nickname
                                    , avatar
                                from users
                                ),
                    users_ideas as
                                (select 
                                    user_id
                                    , count(1) as count_ideas 
                                from ideas
                                group by user_id),
                    users_voted as
                                (select 
                                    user_id
                                    , count(1) as count_voted
                                from ideas_interactives
                                group by user_id),
                    users_commented as
                                (select 
                                    user_id
                                    , count(1) as count_commented
                                    , count(distinct idea_id) as count_commented_ideas 
                                from ideas_comments
                                group by user_id)
                    select a.* 
                        , ifnull(b.count_ideas,0) as count_ideas
                        , ifnull(c.count_voted,0) as count_voted
                        , ifnull(d.count_commented,0) as count_commented
                        , ifnull(d.count_commented_ideas,0) as count_commented_ideas
                        , (ifnull(count_ideas,0) * 7 + ifnull(count_commented_ideas,0) * 5 + ifnull(count_commented,0) * 3 + ifnull(count_voted,0)) as total_action
                    from users_origin a
                    left join users_ideas b
                    on  a.user_id = b.user_id
                    left join users_voted c
                    on  a.user_id = c.user_id
                    left join users_commented d
                    on  a.user_id = d.user_id
                    order by total_action desc
                    --LIMIT 10
					--OFFSET 0
                    `)
            .then(result => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify(result));
            })
            .catch(err => {
                res.status(401).json({
                    message: 'Lỗi truy vấn csdl getListParameters'
                })
            });
    }

    // lấy danh sách câu hỏi
    getQuestions(req, res, next) {
        db.getRsts(`SELECT * FROM ideas_questions
                    where status > 0
                    order by order_1`)
            .then(result => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify(result));
            })
            .catch(err => {
                res.status(401).json({
                    message: 'Lỗi truy vấn csdl getQuestions'
                })
            });
    }

    // lấy danh sách log sql
    getSqlLogs(req, res, next) {
        db.getRsts(`SELECT * FROM sql_log
                    where sql like '%'
                    order by created_time desc
                    LIMIT 10`)
            .then(result => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify(result));
            })
            .catch(err => {
                res.status(401).json({
                    message: 'Lỗi truy vấn csdl getQuestions'
                })
            });
    }

    // lấy các đường dẫn file đính kèm
    // trường hợp các ý tưởng hoặc comment có truyền lên file
    async getIdeasAttachs(req, res, next) {
        let listString = '';
        try {
            let ids = (req.paramS.id_list ? JSON.parse(req.paramS.id_list) : 0);
            listString = ids.toString();
            let images = await db.getRsts(`select id, file_name, file_type from ideas_attachs 
                                where id in (${listString})
                                and file_type like 'image%'
                                `)
            let files = await db.getRsts(`select id, file_name, file_type from ideas_attachs 
                                where id in (${listString})
                                and file_type not like 'image%'
                                `)
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(arrObj.getJsonStringify({ images, files }));
        } catch (err) {
            res.status(401).json({
                error: err,
                message: 'Lỗi đọc danh sách file'
            })
        }

    }

    // trả về file cho client hiển thị ra
    // trường hợp người dùng chọn mở file có id đính kèm
    getFileAttach(req, res, next) {
        let openFilePromise = new Promise((resolve, reject) => {
            let id = req.paramS.id ? req.paramS.id : 0;
            db.getRst(`select file_path, file_type from ideas_attachs where id=${id}`)
                .then(result => {
                    if (result)
                        resolve(result)
                    else
                        reject("Không có file")
                })
                .catch(err => {
                    reject("Lỗi đọc file csdl")
                });
        })

        openFilePromise
            .then(file => {
                // console.log('Data: ', file);
                fs.readFile(file.file_path, { flag: 'r' }, function (error, data) {
                    if (!error) {
                        res.writeHead(200, { 'Content-Type': file.file_type });
                        res.end(data);
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end("No file to read!");
                    }
                });
            })
            .catch(err => {
                res.status(401).json({
                    error: err,
                    message: 'Lỗi đọc file all'
                })
            });
    }

    getCatIdeaTotal(req, res, next) {
        db.getRsts(`select  c.id
                            , c.name
                            , count(*) as total
                    from    ideas_categories as c,
                            ideas as i
                    where c.id = i.category_id
                    group by c.id, c.name
                    `)
            .then(data => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify(data));
            })
            .catch(err => {
                res.status(401).json({
                    message: 'Lỗi lấy tổng ý tưởng theo cat'
                })
            })
    }

    getCatUserIdeaTotal(req, res, next) {
        // console.log(req.paramS.cat_id);
        db.getRsts(`select  i.user_id as id
                            , u.username as name
                            , count(*) as total
                    from    ideas_categories as c,
                            users u,
                            ideas as i
                    where   c.id = i.category_id
                    and     u.id = i.user_id
                    and     c.id = '${req.paramS.cat_id}'
                    group by i.user_id, u.username
                    `)
            .then(data => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify(data));
            })
            .catch(err => {
                res.status(401).json({
                    message: 'Lỗi lấy tổng ý tưởng theo cat'
                })
            });
    }

    getMyIdea(req, res, next) {
        let username = req.paramS.username ? req.paramS.username : req.user.username;
        db.getRsts(`
                    with
                        my_user as 
                            (select id, username from users where username = '${(username)}')
                        ,
                        my_ideas as 
                            (select a.id from ideas a, my_user b where a.user_id = b.id)
                        ,
                        my_likes as 
                            (select DISTINCT a.idea_id from ideas_interactives a, my_user b where a.user_id = b.id)
                        ,
                        my_comments as
                            (select DISTINCT a.idea_id from ideas_comments a, my_user b where a.user_id = b.id)
                        ,
                        my_marks as
                            (select DISTINCT a.idea_id from ideas_marks a, my_user b where a.user_id = b.id)
                        select 
                                d.avatar
                                , d.fullname || '(' || d.nickname || ')' as username
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
                        where 
                            (a.id in (SELECT * from my_ideas)
                            or a.id in (SELECT * from my_likes)
                            or a.id in (SELECT * from my_comments)
                            or a.id in (SELECT * from my_marks))
                        order by IFNULL(a.changed_time, a.created_time) desc
                `).then(data => {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(arrObj.getJsonStringify(data));
        })
            .catch(err => {
                res.status(401).json({
                    message: 'Lỗi lấy my idea'
                })
            });
    }
}

module.exports = new ListHandler();