var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  port:"3306",
  user:"root",
  password: "kenneth8754",
  database:"logs"
});

con.connect(function(err){
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;