# faceapi-website
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/kennethsoh/faceapi-website)

This project, using <a href="https://github.com/justadudewhohacks/face-api.js/" target="_blank">faceapi</a>, is a proof-of-concept website.<br>
The HTML files are minimally styled, and minimal directions are provided for page navigation.

***Important:*** This website is not designed for deployment, hence it has *not* secure by design.

## Installation
1. Read <a href="https://github.com/kennethsoh/faceapi-website/blob/master/LICENSE" target="_blank">license terms</a> before proceeding. 

2. Clone or download this repository and navigate to its folder.
```
$ git clone https://github.com/kennethsoh/faceapi-website.git
$ cd faceapi-website
```

3. Install and set up <a href="https://nodejs.org/en/download/" target="_blank">node.js</a> and <a href="https://dev.mysql.com/downloads/mysql/" target="_blank">mysql server</a>.

4. Install additional required npm modules
```
$ npm install body-parser express fs multer mysql rimraf
```

5. Set up mysql server, creating 1 database: "logs", and 2 tables: "logs" and "users". 
```
> CREATE DATABASE logs;
> CREATE TABLE IF NOT EXISTS logs.logs (`logid` INT NOT NULL AUTO_INCREMENT,`name` VARCHAR(64) NOT NULL,`date` VARCHAR(64) NOT NULL,PRIMARY KEY (`logid`));
> CREATE TABLE IF NOT EXISTS logs.users (`userid` INT NOT NULL AUTO_INCREMENT,`username` VARCHAR(64) NOT NULL,`password` VARCHAR(64) NOT NULL,`imagelink` VARCHAR(64) NOT NULL,PRIMARY KEY (`userid`));
```

6. Depending on your mysql database setup, edit <a href="https://github.com/kennethsoh/faceapi-website/blob/master/db_connection.js" target="_blank">db_connection.js</a> for the correct user and password.

---
## Usage
1. Start the node server and check that the database is connected
```
$ node server.js
Application listening at http://127.0.0.1:3000 ; enter CTRL + C to stop
Database Connected!
```

2. Open a web browser and enter ```127.0.0.1:3000``` in the url bar. You may need to allow webcam access.

---
## Features
#### Face Recognition 
Use of <a href="https://github.com/justadudewhohacks/face-api.js/" target="_blank">faceapi</a>, implemented on top of <a href="https://github.com/tensorflow/tfjs" target="_blank">tensorflow.js core</a>. This software is able to recognise faces and match them against uploaded images. 

#### User Registration and Image Upload
Upload your own image for faceapi to recognise you. To do this, register for an account at ```127.0.0.1:3000/register```. Login to an exisitng account at ```127.0.0.1:3000/login```.<br>

**Note:** Due to existing limitation, your image needs to be renamed to your username before upload. (i.e. If your username will be 'Alice', rename your image file to 'Alice.jpg'). JPG, JPEG and PNG file types are accepted. 

#### User Management
Update your registered image and your password at ```127.0.0.1:3000/user```. You will only be able to access this page if there is an existing user session.
You may also remove your image from the web server by deleting your account.





