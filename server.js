
require('dotenv-extended').load({
    encoding: 'utf8',
    silent: true,
    path: '.env',
    defaults: '.env.defaults',
    schema: '.env.schema',
    errorOnMissing: false,
    errorOnExtra: false,
    assignToProcessEnv: true,
    overrideProcessEnv: false
});

const express = require('express');
const bp = require('body-parser');
const path = require('path');
// const logger = require(path.resolve('server/modules','logger'));
const port = process.env.PORT || 8000;
const app = express();

// require(path.resolve('server','config','db'));
require("./server/config/db");

if (!process.env.TOKEN_SECRET) {
  throw new Error('you must supply a token secret');
}

app.set('token_secret', process.env.TOKEN_SECRET);
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
// app.use(logger);
app.use(express.static(path.resolve('client')));
app.use(express.static(path.resolve('bower_components')));


const routes = require(path.resolve('server', 'config', 'routes'))(app);

const auth = require(path.resolve('server', 'config', 'auth'));
var modules_path = path.resolve('server', 'modules');

app.use('/auth', auth);

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});