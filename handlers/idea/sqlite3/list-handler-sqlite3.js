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
        db.getRsts(`
                    with 
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
                    , b.count_ideas
                    , c.count_voted
                    , d.count_commented
                    , d.count_commented_ideas
                    , (count_ideas * 7 + count_commented_ideas * 5 + count_commented * 3 + count_voted) as total_action
                    from users_origin a
                    left join users_ideas b
                    on  a.user_id = b.user_id
                    left join users_voted c
                    on  a.user_id = c.user_id
                    left join users_commented d
                    on  a.user_id = d.user_id
                    order by total_action desc
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