/**
 * Sử dụng file này trong trường hợp cần migrate dữ liệu cũ sang csdl mới
 */

const SQLiteDAO = require('./db/sqlite3/sqlite-dao');

// Khai báo các file csdl cần export và import vào
const dbFilenameOld = "./db/database/inovation-manager.v4.db";     //ten database cu
const dbFilenameNew = "./db/database/inovation-manager.v5.db";     //ten database moi

// khai báo các tên bảng cần export và import vào từ cũ qua mới
const arrTables = [
    "organizations"
    , "job_roles"
    , "staffs"
    , "users"
    , "ideas"
    , "ideas_comments"
    , "ideas_interactives"
    , "ideas_attachs"
]

const dbOld = new SQLiteDAO(dbFilenameOld);
const dbNew = new SQLiteDAO(dbFilenameNew);

setTimeout(() => {

    let promiseExportImport = new Promise(resolve => {
        arrTables.forEach(async (el, idx) => {
            try {
                let rsts = await dbOld.getRsts(`select * from ${el}`);
                // console.log(rsts);
                let executed = await dbNew.runSql(`delete from ${el}`);
                console.log(executed);
                let inserted = await dbNew.insertTableData(el, rsts);
                console.log('insert', el, inserted);
            } catch (e) {
                console.log('Error: ', e);
            } finally {
                if (idx >= arrTables.length - 1) resolve('finish!')
            }
        })
    })


    promiseExportImport
        .then(async data => {
            console.log('Promise ok: ', data);
            // cập nhập trọng số phân rã từ trên xuống
            // cấp đơn vị là lấy trọng số tích hợp bản đồ chiến lược
            setTimeout(async () => {
                try {
                    // let data = await dbNew.runSql(`update seperated_map_kpi as a set (weight, parent_weight_percent) = (select root_weight_percent, root_weight_percent from strategy_map where id = a.map_id)`)
                    // console.log('1. run sql upgrade: ', data);
                } catch (err) {
                    console.log('Lỗi: ', err);
                }
            }, 5000);
        })

}, 1000)
