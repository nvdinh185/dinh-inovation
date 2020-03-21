"use strict"
/**
 *  
 * Đối tượng truy cập csdl access đơn lẻ của microsolf
 * Chi su dung tren window khong chay dc tren unix
 * 
 */
const msAccess = require('node-adodb');
const isSilence = false;

class MsAccessDAO {
  /**
   * Khởi tạo kết nối csdl access qua giao thức OLEDB
   * @param {*} dbFilePath 
   */
  constructor(dbFilePath, dbPass) {
    this.conn = msAccess.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source='+dbFilePath+';' + (dbPass?"Jet OLEDB:Database Password="+dbPass:""));
  }

  /**
   * 
   * @param {*} table 
   * var table ={
   *              name: 'LOGIN',
   *              cols: [
   *                      {
   *                        name: 'ID',
   *                        type: dataType.integer,
   *                        option_key: 'PRIMARY KEY AUTOINCREMENT',
   *                        description: 'Key duy nhat quan ly'
   *                        }
   *                      ]
   *            }
   */
  createTable(table) {
    let sql = 'CREATE TABLE ' + table.name + ' (';
    let i = 0;
    for (var col of table.cols) {
      if (i++ == 0) {
        sql += col.name + ' ' + col.type + ' ' + col.option_key;
      } else {
        sql += ', ' + col.name + ' ' + col.type + ' ' + col.option_key;
      }
    }
    sql += ')';
    return this.runSql(sql);
  }


  //insert
  /**
   * 
   * @param {*} insertTable 
   * var insertTable={
   *                  name:'tablename',
   *                  cols:[{
   *                        name:'ID',
   *                        value:'1'
   *                        }]
   *                  }
   * 
   */
  insert(insertTable) {
    let sql = 'INSERT INTO ' + insertTable.name
      + ' ('
    let i = 0;
    let sqlNames = '';
    let sqlValues = '';
    let params = [];
    for (let col of insertTable.cols) {
      if (col.value != undefined && col.value != null) {
        params.push(col.value);
        if (i++ == 0) {
          sqlNames += col.name;
          sqlValues += '?';
        } else {
          sqlNames += ', ' + col.name;
          sqlValues += ', ?';
        }
      }
    }

    sql += sqlNames + ') VALUES (';
    sql += sqlValues + ')';

    return this.runSqlParam(sql, params);
  }

  //update 
  /**
   * 
   * @param {*} updateTable
   *  var updateTable={
   *                  name:'tablename',
   *                  cols:[{
   *                        name:'ID',
   *                        value:'1'
   *                        }]
   *                  wheres:[{
   *                         name:'ID',
   *                         value:'1'
   *                         }]
   *                  }
   */
  update(updateTable,isForce) {
    let sql = 'UPDATE ' + updateTable.name + ' SET ';

    let i = 0;
    let params = [];
    for (let col of updateTable.cols) {
      let indexWhere = updateTable.wheres.findIndex(x=>x.name===col.name);
      if (col.value != undefined && col.value != null 
        && (indexWhere < 0 || isForce)  
        //không tìm thấy mệnh đề where mới update cái id này
        //hoặc ép update luôn
        ) {
        //neu gia tri khong phai undefined moi duoc thuc thi
        params.push(col.value);
        if (i++ == 0) {
          sql += col.name + '= ?';
        } else {
          sql += ', ' + col.name + '= ?';
        }
      }
    }

    i = 0;
    for (let col of updateTable.wheres) {
      if (col.value != undefined && col.value != null) {
        params.push(col.value);
        if (i++ == 0) {
          sql += ' WHERE ' + col.name + '= ?';
        } else {
          sql += ' AND ' + col.name + '= ?';
        }
      } else {
        sql += ' WHERE 1=2'; //menh de where sai thi khong cho update Bao toan du lieu
      }
    }
    return this.runSqlParam(sql, params)
  }

  //delete
  /**
   * Ham xoa bang ghi
   * @param {*} id 
   */
  delete(deleteTable) {
    let sql = 'DELETE FROM ' + deleteTable.name;
    let i = 0;
    let params = [];
    for (let col of deleteTable.wheres) {
      if (col.value != undefined && col.value != null) {
        params.push(col.value);
        if (i++ == 0) {
          sql += ' WHERE ' + col.name + '= ?';
        } else {
          sql += ' AND ' + col.name + '= ?';
        }
      } else {
        sql += ' WHERE 1=2'; //dam bao khong bi xoa toan bo so lieu khi khai bao sai
      }
    }
    return this.runSqlParam(sql, params)
  }

  //
  /**
   *lenh select, update, delete su dung keu json 
   * @param {*} selectTable 
   */
  select(selectTable) {
    let sql = 'SELECT * FROM ' + selectTable.name;
    let i = 0;
    let params = [];
    let sqlNames = '';
    for (let col of selectTable.cols) {
      if (i++ == 0) {
        sqlNames += col.name;
      } else {
        sqlNames += ', ' + col.name;
      }
    }
    sql = 'SELECT ' + sqlNames + ' FROM ' + selectTable.name;
    i = 0;
    if (selectTable.wheres) {
      for (let col of selectTable.wheres) {
        if (col.value != undefined && col.value != null) {
          params.push(col.value);
          if (i++ == 0) {
            sql += ' WHERE ' + col.name + '= ?';
          } else {
            sql += ' AND ' + col.name + '= ?';
          }
        }
      }
    }
    //console.log(sql);
    //console.log(params);
    return this.runSqlParam(sql, params)
  }
  //lay 1 bang ghi dau tien cua select
  /**
   * lay 1 bang ghi
   * @param {*} sql 
   * @param {*} params 
   */
  getRst(sql) {
    return this.conn.query(sql)
    .then(results=>{
        if (results && results.length>0){
            return results[0];
        } else {
            return {};
        }
    })
  }

  /**
   * Lay tat ca cac bang ghi
   * @param {*} sql 
   * @param {*} params 
   */
  getRsts(sql) {
    return this.conn.query(sql)
  }

  /**
   * Chuyển đổi sql có chứa ? và param [] thay thế thành câu lệnh sql thuần
   * @param {*} sql 
   * @param {*} param 
   */
  runSqlParam(sql,params=[]){
      let sqlAll = sql;
      if (params && params.length>0){
          params.forEach( el=> {
            sqlAll = sqlAll.replace("?",isNaN(el)?"'"+el+"'":el)
          })
      }
      //console.log(sql, params, sqlAll);
      return this.runSql(sqlAll);
  }


  //cac ham va thu tuc duoc viet duoi nay
  /**
   * Ham thuc thi lenh sql va cac tham so
   * @param {*} sql 
   * @param {*} params 
   */
  runSql(sql) {
    if (!isSilence) console.log('sql: ', sql);
    return this.conn.execute(sql)
  }

}

module.exports = MsAccessDAO; 