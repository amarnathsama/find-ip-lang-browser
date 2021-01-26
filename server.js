// server.js
// where your node app starts

// init project
require('dotenv').config();
const { detect } = require('detect-browser');

var express = require('express');
var app = express();
const browser = detect();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
let returnObj={};
app.get('/api/whoami',(req,res)=>{
  let ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress
  returnObj['ipaddress'] = ip
  returnObj['language'] = req.headers["accept-language"] 
  if (browser) {
    returnObj['software'] = browser.name
  
}
  res.json(returnObj)

})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

