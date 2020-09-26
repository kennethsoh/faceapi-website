const express = require('express');
var db = require('./db_connection')
const bodyParser = require("body-parser");
const routeLogs = require('./public/routeLogs');

var fs = require('fs');
var multer = require('multer');

var app = express();
var host = "127.0.0.1";
var port = 3000;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.route("/");
routeLogs.routeLogs(app);

// Ensures that all attempts to access labaled_images from browser are redirected back to index
app.all('labeled_images', function(req, res) { 
    res.redirect('/index.html'); 
  });

// Redirect to index.html when navigated to 127.0.0.1:3000/
app.get('/', function(req, res) { 
    res.redirect('index.html'); 
  });

// Redirect to register.html when navigated to 127.0.0.1:3000/register
app.get('/register', function(req, res) { 
    res.redirect('register.html'); 
  });

// Redirect to register.html when navigated to 127.0.0.1:3000/login
app.get('/login', function(req, res) { 
  res.redirect('login.html'); 
});

  // Redirect to user.html when navigated to 127.0.0.1:3000/user
app.get('/user', function(req, res) { 
  res.redirect('user.html'); 
});

var server = app.listen(port, host, function() {
    var port = server.address().port;
    var host = server.address().address;

    console.log("Application listening at http://%s:%s ; enter CTRL + C to stop", host, port);
})

module.exports = app;
