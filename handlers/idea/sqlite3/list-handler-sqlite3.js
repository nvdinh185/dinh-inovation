"use strict"

/**
 * Bộ tương tác lấy các danh mục dùng chung cho văn phòng ý tưởng
 * Các danh mục trả về dưới dạng đối tượng
 */

// Kết nối csdl oracle theo pool
const db = require('../../../db/sqlite3/db-pool');
const arrObj = require('../../../utils/array-object');

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

}

module.exports = new ListHandler();