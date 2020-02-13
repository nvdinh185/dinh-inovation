/**
 * Sử dụng file này trong trường hợp cần migrate dữ liệu cũ sang csdl mới
 */

const SQLiteDAO = require('./db/sqlite3/sqlite-dao');

// Khai báo các file csdl cần export và import vào
const dbFilenameOld = "./db/database/kpi-bsc-database-v7.db";     //ten database cu
const dbFilenameNew = "./db/database/kpi-bsc-database-v8.db";     //ten database moi

// khai báo các tên bảng cần export và import vào từ cũ qua mới
const arrTables = [
    "organizations"
    , "job_roles"
    , "staffs"
    , "strategy_map"
    , "seperated_map_kpi"
    , "seperated_roles_kpi"
    , "departments_kpi"
    , "staffs_kpi"
    , "reports"
    , "report_departments_kpi"
    , "report_map_kpi"
    , "report_staffs_kpi"
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

                    let data = await dbNew.runSql(`update seperated_map_kpi as a set (weight, parent_weight_percent) = (select root_weight_percent, root_weight_percent from strategy_map where id = a.map_id)`)

                    console.log('1. run sql upgrade: ', data);


                    //  Update trọng số cho bảng kpi bộ phận    
                    let data2 = await dbNew.runSql(`update departments_kpi as a set (seperated_weight, self_weight, weight) = (select weight, 0.5, weight * 0.5 from seperated_map_kpi where id=a.seperated_map_id) where kpi_role in ('C', 'Tr')`)

                    console.log('2. run sql upgrade: ', data2);


                    // cấp chức danh thì lấy trọng số từ phòng được quy đổi thang 100
                    let data3 = await dbNew.runSql(`update seperated_roles_kpi as a set (weight, parent_weight_percent) = (select root_weight_percent, root_weight_percent from departments_kpi where organization_id = a.organization_id and id=a.department_kpi_id)`)

                    console.log('3. run sql upgrade: ', data3);

                    //  update trọng số cho bảng kpi cá nhân
                    let data4 = await dbNew.runSql(`update staffs_kpi as a set (seperated_weight, self_weight, weight) = (select weight, 0.5, weight * 0.5 from seperated_roles_kpi where id=a.seperated_role_id) where kpi_role in ('C', 'Tr')`)

                    console.log('4. run sql upgrade: ', data4);
                } catch (err) {
                    console.log('Lỗi: ', err);
                }
            }, 5000);
        })

}, 1000)
