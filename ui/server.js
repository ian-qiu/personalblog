var express = require('express');
var app = express();

var fs = require('fs');
var path =require('path');


app.use('/', function(req, res) {
    fs.readFile('./build/index.html', function(err, out) {
        res.set('Content-Type', 'text/html');
        res.send(new Buffer(out));
    })
});

app.listen(9001, function(){
    console.log('server listen http://localhost:9001');
})