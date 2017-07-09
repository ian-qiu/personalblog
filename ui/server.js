var express = require('express');
var app = express();

var fs = require('fs');
var path =require('path');


//跨域
app.use('*', function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next(); 
});

app.use('/', function(req, res) {
    fs.readFile('./build/index.html', function(err, out) {
        res.set('Content-Type', 'text/html');
        res.send(new Buffer(out));
    })
});

app.listen(3000, function(){
    console.log('server listen http://localhost:9090');
})