const express = require('express');
const router = express.Router();
// declare axios for making http requests
const axios = require('axios');
var sql = require("mssql");
const request = require("request");

var twitter_settings = {
    //@litecoinprices2
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


var maxRowIndex = -1;

/* GET api listing. */
router.get('/', (req, res) => {
  console.log('Success!');
  res.send('api works');
});

router.get('/prices', (req, res) => {
    
    console.log('api/prices');
    sql.close();
    sql.connect(config, function (err) {

        if (err)  res.status(500).send(err)
        
        if(maxRowIndex != -1 && maxRowIndex != null) {
            console.log("maxRowIndex is defined")
            res.status(200).json({});
            return;
        }

        //var query = 'SELECT TOP (24) [price],[datetime],[rowIndex] FROM [MikesDatabase].[dbo].[Litecoin] ORDER BY rowIndex DESC';   
        var query =   'SELECT TOP 1 [rowIndex] ' + 
        'FROM [MikesDatabase].[dbo].[Litecoin]  ' + 
        'ORDER BY rowIndex DESC'
        
        var request = new sql.Request();
        //set max row on initialization
        request.query(query, function (err, recordset) {
            if (err)  res.status(500).send(err)
            maxRowIndex = recordset['recordset'][0]['rowIndex']
            console.log("got max = " + maxRowIndex)
            res.status(200).json({});
        });
        
    });
  });

  /*router.get('/twelvehourchart', (req, res) => {

    console.log('api/twelvehourchart');
    sql.close();
    sql.connect(config, function (err) {
        
        var query = 'SELECT TOP (24) [price],[datetime],[rowIndex] FROM [MikesDatabase].[dbo].[Litecoin] ORDER BY rowIndex DESC';   
        if (err)  res.status(500).send(err)
        var request = new sql.Request();
        // query to the database and get the records 
        request.query(query, function (err, recordset) {
            if (err)  res.status(500).send(err)
            // send records as a response
            res.status(200).json(recordset);
        });
    });
  });

  router.get('/onedaychart', (req, res) => {

    console.log('api/onedaychart');
    sql.close();
    sql.connect(config, function (err) {
        
        var query = 'SELECT * FROM' +
        '(	SELECT TOP (48) price ,[datetime],[rowIndex]' +
        'FROM [MikesDatabase].[dbo].[Litecoin] ORDER BY rowIndex DESC' +
        ') AS t';
        
        if (err)  res.status(500).send(err)
        var request = new sql.Request();
        // query to the database and get the records 
        request.query(query, function (err, recordset) {

            //console.log(recordset)
            if (err)  res.status(500).send(err)
            // send records as a response
            res.status(200).json(recordset);
        });
    });
  });*/

  router.get('/twelvehourchart', (req, res) => {

    console.log('api/twelvehourchartnew');
    sql.close();
    sql.connect(config, function (err) {
        
        var query = 'SELECT TOP (360) [price],[datetime],[rowIndex] FROM [MikesDatabase].[dbo].[LitecoinCMCPerMinute] ORDER BY rowIndex DESC';   
        
         //TODO minimize/package results
        
        if (err)  res.status(500).send(err)
        var request = new sql.Request();
        // query to the database and get the records 
        request.query(query, function (err, recordset) {
            if (err)  res.status(500).send(err)
            // send records as a response
            res.status(200).json(recordset);
        });
    });
  });

  router.get('/onedaychart', (req, res) => {

    console.log('api/onedaychartnew');
    sql.close();
    sql.connect(config, function (err) {
        
       /* var query = 'SELECT * FROM' +
        '(	SELECT TOP (720) price ,[datetime],[rowIndex]' +
        'FROM [MikesDatabase].[dbo].[LitecoinCMCPerMinute] ORDER BY rowIndex DESC' +
        ') AS t';*/

        var query = 'SELECT TOP (720) [price],[datetime],[rowIndex] FROM [MikesDatabase].[dbo].[LitecoinCMCPerMinute] ORDER BY rowIndex DESC';   
        
        //TODO minimize/package results 

        if (err)  res.status(500).send(err)
        var request = new sql.Request();
        // query to the database and get the records 
        request.query(query, function (err, recordset) {

            //console.log(recordset)
            if (err)  res.status(500).send(err)
            // send records as a response
            res.status(200).json(recordset);
        });
    });
  });

  router.get('/oneweekchart', (req, res) => {
    
    console.log('api/oneweekchart');
    sql.close();
    sql.connect(config, function (err) {
        
        var query = 'SELECT * FROM' +
        '(	SELECT TOP 336 price ,[datetime],[rowIndex]' + 
            'FROM [MikesDatabase].[dbo].[Litecoin] ORDER BY rowIndex DESC' +
        ') AS t'
        
        if (err)  res.status(500).send(err)
        var request = new sql.Request()
        // query to the database and get the records 
        request.query(query, function (err, recordset) {

            if (err)  res.status(500).send(err)
            // send records as a response
            res.status(200).json(recordset)
        });
    });
  });

  router.get('/onemonthchart', (req, res) => {
    
    console.log('api/onemonthchart');
    sql.close();
    sql.connect(config, function (err) {
        
        var query = 'SELECT t.price, t.datetime, t.rowIndex ' +
        'FROM( SELECT TOP 1440 price, datetime, rowIndex ' +
            'FROM [MikesDatabase].[dbo].[Litecoin] WHERE rowIndex > ' 
            + maxRowIndex.toString() + ' - 1440 ' +
        ') AS t WHERE t.rowIndex % 4 = 0 ORDER BY t.rowIndex DESC'
        // was  % 20
        if (err)  res.status(500).send(err)
        var request = new sql.Request()
        // query to the database and get the records 
        request.query(query, function (err, recordset) {

            if (err)  res.status(500).send(err)
            // send records as a response
            res.status(200).json(recordset)
        });
    });
  });

  router.get('/threemonthchart', (req, res) => {
    
    console.log('api/threemonthchart');
    sql.close();
    sql.connect(config, function (err) {
        
        var query = 'SELECT t.price, t.datetime, t.rowIndex ' +
        'FROM( SELECT TOP 4320 price, datetime, rowIndex ' +
            'FROM [MikesDatabase].[dbo].[Litecoin] WHERE rowIndex > ' 
            + maxRowIndex.toString() + ' - 4320 ' +
        ') AS t WHERE t.rowIndex % 12 = 0 ORDER BY t.rowIndex DESC'
        // was  % 144
        if (err)  res.status(500).send(err)
        var request = new sql.Request()
        // query to the database and get the records 
        request.query(query, function (err, recordset) {

            if (err)  res.status(500).send(err)
            // send records as a response
            res.status(200).json(recordset)
        });
    });
  });

  /*router.get('/onemonthchart', (req, res) => {
    
    console.log('api/onemonthchart');
    sql.close();
    sql.connect(config, function (err) {
        
        var query = 'SELECT * FROM' +
        '(	SELECT TOP 1440 price ,[datetime],[rowIndex]' + 
            'FROM [MikesDatabase].[dbo].[Litecoin] ORDER BY rowIndex DESC' +
        ') AS t'
        
        if (err)  res.status(500).send(err)
        var request = new sql.Request()
        // query to the database and get the records 
        request.query(query, function (err, recordset) {
            
            if (err)  res.status(500).send(err)
            finalset = [] //store 2 hour averages
            var sum = 0
            var count = 0
            
            //average over 2 hour span
            for(var i = 0; i < recordset['recordset'].length; i++){
                sum += parseInt(recordset['recordset'][i]['price'])
                count = count + 1
                if(i % 4 == 0 && i!= 0 && (i/4) < 337){
                    var curr = { price: (sum / count), 
                            datetime: recordset['recordset'][i]['datetime'], 
                            rowIndex: (i/4) }
                    finalset[i/4] = curr
                    sum  = 0
                    count = 0
                }
                else if((i/4) >= 337){
                    break;
                }
            }
            finalset.shift()
            var result =  { recordset: finalset }
            // send records as a response
            res.status(200).json(result)
        });
    });
  });*/

  router.get('/authorize', (req, res) => { //authorize twitter token before use
    
    console.log('api/authorize');
    var header = twitter_settings.consumerkey + ':' + twitter_settings.consumersecret;
    var encheader = new Buffer(header).toString('base64');
    var finalheader = 'Basic ' + encheader;
    
    request.post('https://api.twitter.com/oauth2/token', {form: {'grant_type': 'client_credentials'}, 
    headers: {Authorization: finalheader}}, function(error, response, body) {    
        if(error || JSON.parse(body).access_token == null){
          //console.log(error);
          res.json({success: false, data:""});
        }
        else {
          twitter_settings.bearertoken = JSON.parse(body).access_token;
          res.json({success: true, data:twitter_settings.bearertoken.toString()});
        }
    })
  });
    
  router.post('/twitterfeed', (req, res) => {
    
    console.log('api/twitterfeed');
    var token = req.body["token"].data
    var searchquery = 'litecoin';
    var encsearchquery = encodeURIComponent(searchquery);
    var bearerheader = 'Bearer ' + token;
    
    request.get('https://api.twitter.com/1.1/search/tweets.json?q=' + encsearchquery +
         '&result_type=popular&count=10', {headers: {Authorization: bearerheader}}, function(err, body, response) {
        if(err){
            console.log(err);
        }
        else {
            res.json({success: true, data:JSON.parse(body.body)});
        }
    })
  }); 

  router.post('/email', (req, res) => {

    console.log('api/email');
    var email = req.body["email"]    
    sql.close();
    sql.connect(config, function (err) {
        
        if (err)  res.status(500).send(err)
        var request = new sql.Request();
        // query to the database and get the records 
        request.query("insert into Email values('" + email +  "')", function (err) {            
            if (err)  res.status(500).send(err)
            // send records as a response
            res.status(200);
        });
    });
  });

module.exports = router;