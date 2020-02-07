"use strict"
/**
 * Khai báo kết nối csdl, các thành phần khác chỉ import nó 
 * và dùng:
 * const db = require('../db/oracle/db-pool');
 */

const OracleDAO = require("./oracle-dao");

const dbConfig = {
    poolAlias: 'JOB_OWNER_Pool-cty3',     //ten cua pool
    user: 'job_owner',                    //username to oracle
    password: 'job',                      //password to oracle
    // connection String to oracle = tnsname 
    // chuỗi nối máy 14 để select dữ liệu thông báo cước 
    connectString: 
    /* `(DESCRIPTION =
        (ADDRESS_LIST =
          (ADDRESS = (PROTOCOL = TCP)(HOST = 10.151.59.14)(PORT = 1521))
        )
        (CONNECT_DATA =
          (SERVER = DEDICATED)
          (SERVICE_NAME = SALE)
        )
      )`, */
    `(DESCRIPTION=
        (ADDRESS_LIST=
            (ADDRESS=
                (PROTOCOL=TCP)
                (HOST=10.151.59.91)
                (PORT=1521))
                (ADDRESS=(PROTOCOL=TCP)
                (HOST=10.151.59.92)
                (PORT=1521)))
                (LOAD_BALANCE=yes)
                (CONNECT_DATA=(SERVER=dedicated)
                (SERVICE_NAME=BUSINESS)))`,
    poolMax: 10,            // so luong pool max default = 4
    poolMin: 2,             // so luong pool min default = 0
    poolIncrement: 2,       // so luong pool tang len neu co default la 1
    queueRequests: true,    // defaut = true neu so luong connection vuot qua 
    poolTimeout: 60         // thoi gian pool timeout khi idle default 60
}

module.exports =  new OracleDAO(dbConfig);