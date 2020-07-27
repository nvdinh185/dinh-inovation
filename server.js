const express = require('express');
const path = require('path');
const app = express();

main = (isHttp) => {
  //CORS handle
  app.use(require('./handlers/cors-handler').cors);

  app.use(express.static(__dirname + '/client/www'));

  app.use('/m-inovation/api/auth', require('./routes/auth/login-auth'));

  app.use('/m-inovation/api', require('./routes/idea/idea-route-sqlite3'));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/www', 'index.html'));
  });

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