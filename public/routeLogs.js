var db = require('../db_connection')
const path = require("path") 
var fs = require('fs')
var multer = require('multer')

function routeLogs(app)
{
    app.post('/postlog', function(req, response) {
    
        var name = req.body.name;
        var date = req.body.date;
        var message = "";
        var sql = "INSERT into logs (`name`, `date`) VALUES (\"" + name + "\", \"" + date + "\")";
        db.query(sql, [name, date], function(error, results) {
            if (error) {
                response.json(error)
            } else {
                message = {"code":"success"};
                response.json(message)
            }

    });

});
    // visit http://127.0.0.1:3000/getlogs to see all data in DB.
    app.get('/getlogs', function(request, response) {
    var sql = "SELECT * FROM logs";
    db.query(sql, function(error, results){
        if (error) {
            response.json(error);
        } else {
            response.json(results);
        }
    
    });
});


// Disk Storage options for uploaded image
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
        var fs = require('fs');
        var user = file.originalname.replace('.jpg','')
        var user = user.replace('.png','')
        var user = user.replace('.jpeg','')
        var user = user.toLowerCase();
        console.log(user)
        var dir = 'public/labeled_images/'+user;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
  
        // Uploads is the Upload_folder_name 
        cb(null, dir) 
    }, 
    filename: function (req, file, cb) { 
      cb(null, "1.jpg") 
    } 
  }) 



const maxSize = 1 * 10000 * 10000; //maximum file size
// Upload using multer
var upload = multer({  
    storage: storage, 
    limits: { fileSize: maxSize }, 
    fileFilter: function (req, file, cb){ 
    
        // Set the filetypes, it is optional 
        var filetypes = /jpeg|jpg|png/; 
        var mimetype = filetypes.test(file.mimetype); 
  
        var extname = filetypes.test(path.extname( 
                    file.originalname).toLowerCase()); 
        
        if (mimetype && extname) { 
            return cb(null, true); 
        } 
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes); 
      }
    })

    // Upload image to /public/labeled_images
    app.post('/register_user', upload.single('userImage'), function(request, response) {
        console.log(request.file, request.body.username, request.body.password);
        var username = request.body.username;
        var username = username.toLowerCase();
        var password = request.body.password;
        var imagelink = request.file.filename;
        console.log(imagelink);
        var sql= "INSERT INTO users (`username`,`password`,`imagelink`) VALUES (\"" + username + "\",\"" + password + "\",\"" + imagelink + "\")";
        return db.query(sql,[username, password, imagelink], function(error, results){
            if (error){
                response.json(error)

            } else {
                response.redirect("/login.html");
            }
        });
});

var storageupdate = multer.diskStorage({ 
    destination: function (req, file, cb) { 
        var fs = require('fs');
        var user = file.originalname.replace('.jpg','')
        var user = user.replace('.png','')
        var user = user.replace('.jpeg','')
        var user = user.toLowerCase();
        console.log(user)
        var dir = 'public/labeled_images/'+user;

        // delete all files belonging to user
        var rimraf = require("rimraf");
        rimraf.sync("public/labeled_images/"+user);

        // Recreate folder structure for user
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

  
        // Uploads is the Upload_folder_name 
        cb(null, dir) 
    }, 
    filename: function (req, file, cb) { 
      cb(null, "1.jpg") 
    } 
  }) 

var update = multer({  
    storage: storageupdate, 
    limits: { fileSize: maxSize }, 
    fileFilter: function (req, file, cb){ 
    
        // Set the filetypes, it is optional 
        var filetypes = /jpeg|jpg|png/; 
        var mimetype = filetypes.test(file.mimetype); 
  
        var extname = filetypes.test(path.extname( 
                    file.originalname).toLowerCase()); 
        
        if (mimetype && extname) { 
            return cb(null, true); 
        } 
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes); 
      }
    })
    app.post('/updateuser', update.single('updateImage'), function(request, response) {
        console.log(request.file, request.body.useridfield, request.body.updatepassword);
        var userid = request.body.useridfield;
        var password = request.body.updatepassword;
        var imagelink = request.file.filename;
        console.log(imagelink);
        var sql = "UPDATE users SET password = \"" + password + "\"," + "imagelink = \"" + imagelink  +"\" WHERE userid =" + userid;
        return db.query(sql,[password, imagelink, userid], function(error, results){
            if (error){
                response.json(error)
            } else {
                response.redirect("/user.html");
            }
        });
    });

    app.post('/login_user', function(request, response){
        var username = request.body.username;
        var username = username.toLowerCase();
        var password = request.body.password;
        var message = ""
        var sql = "SELECT * FROM logs.users WHERE username = \"" + username +"\"";
        db.query(sql, [username], function(error, results) {
            if (error) {
                response.json(error)
            } else if (results.length > 0 ) {
                if (password == results[0].password) {
                    message = "success";
                    console.log(message); // for local cmd prompt
                    response.json(results) //change back to response.json(results) or json(message)
                } else {
                    message = "failure";
                    console.log(message); // for local cmd prompt
                    response.json(results) //change back to response.json(results) or json(mesaage)
                }
            } else {
                message = "no user"; 
                console.log(message); 
                response.json(message)

                }
            
        
            });
    });

    app.get('/userlist', function(request,response){
        var sql = "SELECT username FROM logs.users";
        db.query(sql, function(error, results){
            if (error){
                response.json(error);
            } else {
                response.json(results);
            }
        });

    });

    app.post('/deleteuser/', function(request, response){
        var userid = request.body.userid;
        var username = request.body.username;
        var username = username.toLowerCase();
        console.log("Username: "+username);
        var sql = "DELETE from users WHERE userid = " + userid;

        // Delete user folder (similar to rm -rf)
        var rimraf = require("rimraf");
        rimraf.sync("public/labeled_images/"+username);

        return db.query(sql, [userid], function(error, results) {
            if (error) {
                response.json(error);
            } else {
                response.json(results);
            }     
        });
    });

}




module.exports = {routeLogs};