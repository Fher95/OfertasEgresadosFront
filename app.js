const express = require('express');
const path = require('path');
const appname = 'OfertasEgresadosFront';

const app = express();

app.use(express.static(__dirname + `/dist/${appname}`));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + `/dist/${appname}/index.html`));
});

app.listen(process.env.PORT || 8080);
