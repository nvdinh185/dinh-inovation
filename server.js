/**
 * Đây là máy chủ chạy thật trên https://c3.mobifone.vn/ebill
 * Tất cả đường dẫn khai báo chạy máy chủ này phải tuân thủ:
 * Khai báo cố định một tiếp đầu ngữ /ebill để máy chủ nginx forward root qua
 * 
 * Không cần sử dụng các thành phần cors() và parserBody vì đã có utils xử lý
 * 
 * 
 * 
 */
const express = require('express');
const app = express();
const fs = require('fs');
const os = require('os');


const arrObj = require('./utils/array-object');

// thành phần web
const { ldap_auth } = require('./routes/auth');

function main(isHttp, isHttps) {

  // Đường dẫn web tĩnh dành cho client 
  app.use(express.static(__dirname + '/client/www'));
  app.use("/m-inovation", express.static(__dirname + '/client/www'));

  // Công cụ ngăn chặn DDOS dò tìm api và quét liên tục resource server
  // Ngăn chặn tấn công ddos, truy xuất tần suất cao / giây...
  app.use(require('./ddos/ddos-config').express('ip', 'path'));

  // CORS handle xử lý trả về req.paramS và các tham số của client, device web
  // Công cụ xử lý cors cho phép client thay cho cors() 
  app.use(require('./handlers/cors-handler').cors);
  
  // Máy chủ xác thực cho phép user login và xác thực cấp token cho client
  // Đây là máy chủ xác thực ldap của mobifone
  app.use('/m-inovation/api/auth', ldap_auth);
  
  // Máy chủ api giao tiếp cho ý tưởng
  app.use('/m-inovation/api', require('./routes/idea/idea-route-sqlite3'));

  // Máy chủ api cho giao tiếp huấn luyện tiếng việt xử lý ngôn ngữ tự nhiên 
  // tìm kiếm các chủ đề và nội dung tương tự
  app.use('/m-inovation/nlp', require('./routes/nlp/idea-route-fasttext'));

  // Máy chủ giao tiếp huấn luyện bot bằng fasttext
  app.use('/m-inovation/chatbot', require('./routes/chatbot/chatbot-route-fasttext'));

  //ham tra loi cac dia chi khong co
  //The 404 Route (ALWAYS Keep this as the last route)
  app.all('*', (req, res) => {
    // redirect về trang chủ cho trường hợp đây là web client giao tiếp khách hàng nhé
    res.redirect('/m-inovation')
    //gui trang thai bao noi dung tra ve
    // res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    // res.end('<h1>Xin lỗi trang bạn muốn tìm không tồn tại!</h1>Địa chỉ ip của bạn là : ' + req.clientIp);
  });

  //cac route truoc chi can throw, thi error nay se tra loi cho nguoi sdung
  //Error handle ALLWAYS keep last route even all
  app.use(require('./handlers/error-handler').errors);

  if (isHttp) {
    // For http
    const httpServer = require('http').createServer(app);
    const portHttp = process.env.PORT || isHttp;
    httpServer.listen(portHttp, () => {
      console.log("Server HTTP (" + os.platform() + "; " + os.arch() + ") is started with PORT: "
        + portHttp
        + "\n tempdir: " + os.tmpdir()
        + "\n " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      );
    });
  }

  if (isHttps) {
    // For https
    const privateKey = fs.readFileSync('cert/report-bill-server-private-key.pem', 'utf8');
    const certificate = fs.readFileSync('cert/report-bill-server-certificate.pem', 'utf8');
    const credentials = {
      key: privateKey,
      cert: certificate,
      honorCipherOrder: true,
      ciphers: [
        'ECDHE-RSA-AES128-GCM-SHA256',
        'ECDHE-ECDSA-AES128-GCM-SHA256',
        'ECDHE-RSA-AES256-GCM-SHA384',
        'ECDHE-ECDSA-AES256-GCM-SHA384',
        'DHE-RSA-AES128-GCM-SHA256',
        'ECDHE-RSA-AES128-SHA256',
        'DHE-RSA-AES128-SHA256',
        'ECDHE-RSA-AES256-SHA384',
        'DHE-RSA-AES256-SHA384',
        'ECDHE-RSA-AES256-SHA256',
        'DHE-RSA-AES256-SHA256',
        'HIGH',
        '!aNULL',
        '!eNULL',
        '!EXPORT',
        '!DES',
        '!RC4',
        '!MD5',
        '!PSK',
        '!SRP',
        '!CAMELLIA'
      ].join(':')
    };
    const portHttps = process.env.PORT || isHttps;
    const httpsServer = require('https').createServer(credentials, app);

    httpsServer.listen(portHttps, () => {
      console.log("Server HTTPS (" + os.platform() + "; " + os.arch() + ") is started with PORT: "
        + portHttps
        + "\n tempdir: " + os.tmpdir()
        + "\n " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      );
    });

  }

}


//=false or port number >1000
var port = process.env.PORT || 9223;

let type = 'http';
let parms = process.argv.slice(2);
// console.log('cac tham so:', parms);

parms.forEach(
  (arg, idx) => {

    // console.log('cac tham so:', idx, arg);

    switch (arg) {
      case '--port':
        port = parms[idx + 1] ? parms[idx + 1] : port
        break;
      case 'https':
      case '--https':
        type = 'https';
        break;
    }
  });

if (type === 'https') {
  main(false, port);
} else {
  main(port, false);
}

const cron = require("node-cron");
cron.schedule("0 0 5 15,28 * *", function () {
  let curDate = new Date();
  let hh24mi = ("" + curDate.getHours()).padStart(2, 0) + ":" + ("" + curDate.getMinutes()).padStart(2, 0);
  console.log(hh24mi, "backup db by github");
})