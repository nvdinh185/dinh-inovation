const excel_db = require('./db/sqlite3/excel-2-sqlite');

const excelFilename = "./db/excel/sqlite-inovation-manager-v1.xlsx";   //ten file excel cau hinh
const dbFilename = "./db/database/inovation-manager.v1.db";           //ten database muon tao

const fs = require('fs');
try {
    //xoa file csdl cu neu co
    if (fs.existsSync(dbFilename)) {
        fs.unlinkSync(dbFilename);
        console.error("Xoa file cu thanh cong");
    }
    //Dùng service để đọc file excel và tạo csdl sqlite3
    excel_db(dbFilename, excelFilename);
} catch (err) {
    console.error("Loi tao moi file", err);
}