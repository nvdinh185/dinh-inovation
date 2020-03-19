"use strict"

/**
 * Bộ tương tác csdl để xử lý review ý tưởng (họp hội đồng đánh giá)
 */

// Kết nối csdl oracle theo pool
const db = require('../../../db/sqlite3/db-pool');
const arrObj = require('../../../utils/array-object');

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

class ReviewHandler {

    /**
     * 1. Tạo mới kỳ họp hoặc sửa
     */
    async addReview(req, res, next) {

        let fileIds;
        if (req.form_data.params.count_file > 0) {
            fileIds = await saveAttachFiles(req.form_data.files, req.user.id)
        }

        const reviewInfo = {
            ...req.form_data.params,
            // các trường thông tin thêm vào
            attach_id_list: fileIds ? JSON.stringify(fileIds) : undefined,
            user_id: req.user.id,
            created_time: Date.now()
        }

        // xóa cột gia tăng file nếu có
        delete reviewInfo["count_file"];
        if (reviewInfo.id > 0) {
            // Trường hợp sửa
            db.update(arrObj.convertSqlFromJson("ideas_reviews", reviewInfo, ['id']))
                .then(data => {
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(arrObj.getJsonStringify({ status: "OK", message: "Tạo mới thành công" }));
                })
                .catch(err => {
                    console.log('Lỗi sửa kỳ họp', err);
                    res.status(401).json({
                        message: 'Lỗi sửa kỳ họp, liên hệ quản trị hệ thống',
                        error: err
                    })
                });
        } else {
            db.insert(arrObj.convertSqlFromJson("ideas_reviews", reviewInfo))
                .then(data => {
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(arrObj.getJsonStringify({ status: "OK", message: "Tạo mới thành công" }));
                })
                .catch(err => {
                    console.log('Lỗi tạo kỳ họp mới', err);
                    res.status(401).json({
                        message: 'Lỗi tạo kỳ họp mới, liên hệ quản trị hệ thống',
                        error: err
                    })
                });
        }

    }

    getReviews(req, res, next) {
        db.getRsts(`select * from ideas_reviews
                    ORDER BY created_time desc
                    LIMIT 20
                    OFFSET ${(req.paramS.offset ? req.paramS.offset : 0)}
                    `)
            .then(data => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify(data));
            })
            .catch(err => {
                console.log(err);
                res.status(401).json({
                    message: 'Lỗi lấy số kỳ đánh giá của hội đồng'
                })
            })
    }

    getReviewDetail(req, res, next) {
        db.getRsts(`with 
                        ideas_eval as
                            (select 
                            d.fullname
                            , d.avatar
                            , c.name as status_type_name
                            , b.status_type
                            , b.name as status_name
                            , cat.name as category_name
                            , a.* from ideas a
                            left join ideas_categories cat
                            on a.category_id = cat.id
                            LEFT JOIN ideas_statuses b
                            on a.status = b.id
                            LEFT JOIN ideas_status_type c
                            on b.status_type = c.id
                            LEFT JOIN users d
                            on a.user_id = d.id
                            )
                        select b.value_prize, b.description as old_review_result ,a.* from ideas_eval a
                        LEFT JOIN ideas_prizes b
                        on a.id = b.idea_id
                        and b.review_id = ${(req.paramS.id ? req.paramS.id : 0)} -- kỳ họp hội đồng
                        ${(req.paramS.show_all ? `` : `where a.status_type in (2,3)`)} -- chỉ hiển thị các trạng thái còn triển khai tiếp
                        order by IFNULL(a.changed_time, a.created_time)
                    `)
            .then(data => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify(data));
            })
            .catch(err => {
                res.status(401).json({
                    message: 'Lỗi lấy số ideas theo từng kỳ đánh giá'
                })
            })
    }

    async addIdeaPrize(req, res, next) {
        let jsonPrize = req.json_data;
        // console.log(jsonPrize);
        const ideaPrize = {
            ...req.json_data,
            // các trường thông tin thêm vào
            user_id: req.user.id,                // ý tưởng của user này
            created_time: Date.now()
        }

        try {
            await db.insert(arrObj.convertSqlFromJson("ideas_prizes", ideaPrize))
        } catch (err) {
            // console.log(err);
            if (err.code === 'SQLITE_CONSTRAINT') {
                await db.update(arrObj.convertSqlFromJson("ideas_prizes", ideaPrize, ['idea_id', 'review_id']));
            } else {
                res.status(401).json({
                    message: 'Lỗi update idea, liên hệ quản trị hệ thống',
                    error: err
                })
                return;
            }
        }
        let ideaRow;
        try {
            ideaRow = await db.getRst(` select status_chain, status
                                            from ideas
                                            where id = ${(ideaPrize.idea_id)}
                                            `)

        } catch { }
        let oldStatusChain = ideaRow && ideaRow.status_chain ? JSON.parse(ideaRow.status_chain) : [];
        // Nếu trong trường hợp bản ghi cuối (trong status_chain) mà trạng thái = trạng thái muốn thay đổi
        // => 
        if (ideaRow.status === ideaPrize.idea_status) {
            oldStatusChain.push({
                user_name: req.user.username,
                description: ideaPrize.description,
                value_prize: ideaPrize.value_prize,
                changed_time: Date.now(),
                status: ideaPrize.idea_status
            })
        }
        // Lưu vào bảng ideas 
        let ideaJson = {
            id: ideaPrize.idea_id,
            last_review_id: ideaPrize.review_id,
            last_value_prize: ideaPrize.value_prize,
            status: ideaPrize.idea_status,
            changed_time: Date.now(),
            changed_username: req.user.username,
            status_chain: JSON.stringify(oldStatusChain)
        }

        try {
            let res = await db.update(db.convertSqlFromJson('ideas', ideaJson, ['id']))
            // console.log(res, ideaJson.id);
        } catch (err) {
            // console.log(err);
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(arrObj.getJsonStringify({ status: "OK", message: "Chấm điểm thành công" }));
    }

}



module.exports = new ReviewHandler();