const express = require('express');
const app = express();

// thành phần web
const { ldap_auth } = require('./routes/auth');

main = (isHttp) => {
  //CORS handle
  app.use(require('./handlers/cors-handler').cors);

  // Đây là máy chủ xác thực ldap của mobifone
  app.use('/m-inovation/api/auth', ldap_auth);

  // Máy chủ api giao tiếp cho ý tưởng
  app.use('/m-inovation/api', require('./routes/idea/idea-route-sqlite3'));

  if (isHttp) {
    const httpServer = require('http').createServer(app);
    const portHttp = process.env.PORT || isHttp;
    httpServer.listen(portHttp, () => {
      console.log("Server is running in port: " + portHttp);
    });
  }
}

const isHttp = 9223;

main(isHttp);