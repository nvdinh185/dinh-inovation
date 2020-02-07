/**
 * Chuyển đổi đọc excel 1 loại thôi
 * 09/01/2020
 * 
 */

// Khai báo csdl
// const db = require('./db-pool')
 
const xlsxtojson1st = require("xlsx-to-json-lc");

const Excel2Oracle = (dbIn, excelFilename) => {
    
    // khai báo csdl vào, nếu có còn không thì dùng mặt định
    let db = dbIn?dbIn:require('./db-pool');
    
    setTimeout(() => {
        if (db.isConnected()) {
            console.log('Database Oracle ready!');
            readExcelCreateTables(db, excelFilename);
        } else {
            console.log('No Database Oracle!')
        }
    }, 1000);

}

const readExcelCreateTables = (db, excelFilename) =>
    // Đọc dữ liệu từ file excel
    xlsxtojson1st({
        input: excelFilename,   // tên file cần lấy dữ liệu excel .xlsx 
        sheet: "tables",        // Tên bảng cần lấy dữ liệu
        output: null,           // since we don't need output.json
        lowerCaseHeaders: true  // converts excel header rows into lowercase as json keys
    }, (err, results) => {
        if (err) {
            console.log('Lỗi đọc file excel:', err);
        } else {
            // Lấy kết quả đọc này tạo thành bảng dữ liệu
            db.createTables(results)
                .then(tablesCreated => {
                    console.log('Các bảng được tạo là', tablesCreated);
                    //đọc lần lượt các bảng có tên trong tablesCreated trong file excel nếu có
                    tablesCreated.forEach(tableName => {
                        readExcelInsertDatas(db, excelFilename, tableName);
                    });
                });
            //sau khi tạo xong bảng (do nó chạy kiểu async nên phải đợi xong)
        }
    });

const readExcelInsertDatas = (db, excelFilename, tableName) =>
    xlsxtojson1st({
        input: excelFilename,   // tên file cần lấy dữ liệu excel .xlsx 
        sheet: tableName,        // Tên bảng cần lấy dữ liệu
        output: null,           // since we don't need output.json
        lowerCaseHeaders: true  // converts excel header rows into lowercase as json keys
    }, (err, results) => {
        if (err) {
            console.log('Lỗi đọc file excel:', err);
        } else {
            // console.log('kq', tableName, results[0]);
            // Chuyen doi du lieu '' = null de khong update vao nhe
            let jsonStr = JSON.stringify(results,
                (key, value) => {
                    if (value === null || value === '') { return undefined; }
                    return value;
                },
                2);
            // Loại bỏ các cell='' thành null hoặc undefined 
            let json = JSON.parse(jsonStr);

            db.insertTableData(tableName, json)
                .then(data => {
                    console.log('insert Data to: ', tableName, data);
                })

        }
    });

module.exports = Excel2Oracle;