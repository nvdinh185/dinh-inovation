"use strict"
/**
 * Khai báo kết nối csdl, các thành phần khác chỉ import nó 
 * và dùng:
 * const db = require('../../db/access/access-pool');
 * 
 * và dùng tương tự như oracle hoặc sqlite
 * 
 */

 //Khai báo thành phần dao kết nối
 //npm i node-adodb --> cài đặt thành phần này trước chỉ cho window
const AccessDAO =  require('./access-dao');

//trỏ đến file cơ sở dữ liệu access của microsoft nằm ở đâu chính xác
const dbFile = './db/database/demo-access-2003.mdb';

//khai báo pass nếu có
const pass = undefined;

module.exports = new AccessDAO(dbFile,pass);

//cách dùng chỉ cần khai báo:
//const db = require('../../db/access/access-pool');
//và các lệnh db.getRst, getRsts, insert, update,.... như cũ