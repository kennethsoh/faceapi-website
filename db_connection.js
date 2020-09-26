var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  port:"3306",      // mysql database port. 3306 is default
  user:"root",      // mysql database login username
  password: "",     // mysql database login password 
  database:"logs"
});

con.connect(function(err){
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = con;
