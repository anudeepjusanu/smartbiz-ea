/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./util//logger');
var { v1_base_path, secret, dburl } = require('../config');
const argv = require('./util/argv');
const port = require('./util//port');
const path = require('path');
const Logger = require('tracer').dailyfile({ root: '.logs/', maxLogFiles: 10, allLogsFileName: 'CCB3Logs' });
const fs = require('fs');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var Router = require('./app/routes/index');
var session = require('express-session');
var cors = require('cors');
var mongoose = require('mongoose');
var rfs = require('rotating-file-stream');
var morganBody = require('morgan-body');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
});

app.use(bodyParser.json()); //parsing request body
morganBody(app);
morganBody(app, { stream: accessLogStream, noColors: true });
app.use(bodyParser.json()); //parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: secret, resave: false, saveUninitialized: true }));

// This code will add cache expire header for 1 day
app.get('/*', (req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=2592000');
  res.setHeader('Expires', new Date(Date.now() + 85000000).toUTCString());
  next();
});

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

app.get('/heartBeat', (req, res) => {
  res.send('OK');
});

app.post('/logs', (req, res, next) => {
  Logger.info(`Type ${req.body.type}`);
  Logger.info(`Data ${JSON.stringify(req.body.logs)}`);
  res.send('OK');
});

app.get('/', (req, res) => {
  fs.readFile('./home.html', (err, file) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(file.toString());
    }
  });
});

app.use(cors({
  origin: process.env.CROSS_ORIGIN,
  exposedHeaders: [''],
  methods: "GET,PUT,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 404
}));

mongoose.connect(dburl);
app.use('/app', require('./app/routes/app_routes'));
//app.use(v1_base_path, expressJwt({ secret: secret }).unless({ path: [v1_base_path + '/authenticate/register', v1_base_path + '/authenticate/login', v1_base_path + '/authenticate/token', v1_base_path + '/order', v1_base_path + '/sales'] }), Router);
app.use(v1_base_path, Router);


// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
