const express = require('express');
const path = require('path');
const app = express();

main = (isHttp) => {
  //CORS handle
  app.use(require('./handlers/cors-handler').cors);

  app.use(express.static(__dirname + '/client/www'));

  app.use('/inovation/auth', require('./routes/auth/authentication'));

  app.use('/inovation/api', require('./routes/idea/idea-route-sqlite3'));

  app.get('/*', (req, res) => {
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