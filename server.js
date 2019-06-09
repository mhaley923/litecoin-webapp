// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const https = require("https");
const bodyParser = require('body-parser');
// Get our API routes
const api = require('./server/routes/api');
const app = express();
const sql = require("mssql");
const request = require("request");

var twitter_settings = {
  consumerkey: '',
  consumersecret: '',
  bearertoken: ''
}; 

var config = {
  user: 'user',
  password: 'password',
  server: 'server', 
  database: 'database'
}; 

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function (req, res, next) {

  /* 1. Website you wish to allow to connect
     2. Request methods/headers to allow
     3. T/F website should include cookies in requests sent to the API
     (if u are using sessions)*/

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
  
/*** Get port from environment and store in Express.*/
//const port = process.env.PORT || '3000';
const port = process.env.PORT || '3000';

app.set('port', port);

/*** Create HTTP server.*/
const server = http.createServer(app);

/*** Listen on provided port, on all network interfaces.*/
server.listen(port, () =>  console.log(`API running on localhost:${port}`) );

