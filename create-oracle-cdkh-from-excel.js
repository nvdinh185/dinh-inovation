/**
 * Gói này cho phép khai báo một file excel có cấu trúc bảng như mẫu
 * ./db/excel/oracle-bill-report-tables.xlsx
 * Thực hiện chèn dữ liệu mẫu từ file excel vào csdl
 * 
 */

const excelFilename = `./db/excel/oracle-cdkh-tc-tk-2020-1.1.xlsx`;    // ten file excel cau hinh thiết kế csdl
const dbOracle = require(`./db/oracle/db-pool-cdkh`)               // Kết nối csdl oracle

const Excel2Oracle = require('./db/oracle/excel-2-oracle');

Excel2Oracle(dbOracle, excelFilename);