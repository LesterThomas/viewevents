var express = require('express');
var app = express();

// The number of milliseconds in one day
//var oneDay = 86400000;

// Use compress middleware to gzip content
//app.use(express.compress());

// Serve up content from public directory
app.use(express.static(__dirname + '/dist')); //, { maxAge: oneDay }));

app.listen(process.env.PORT || 3000);


var forward = require('./forward.js');

// instantiate `app` et al

app.use(forward(/\/db\/(.*)/, "https://40a04e93-daf4-47c7-9faa-f25334792d10-bluemix.cloudant.com/home-automation/"));