# faceapi-website
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)

This project, using <a href="https://github.com/justadudewhohacks/face-api.js/" target="_blank">faceapi</a>, is a proof-of-concept website.

## Installation
1. Read <a href="https://github.com/kennethsoh/faceapi-website/blob/master/LICENSE" target="_blank">license</a> terms before proceeding. 

2. Clone this repository
```
$ git clone https://github.com/kennethsoh/faceapi-website.git
$ cd faceapi-website
```

3. Install <a href="https://nodejs.org/en/download/" target="_blank">node.js</a> and <a href="https://dev.mysql.com/downloads/mysql/" target="_blank">mysql server</a>

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


## Usage
1. Start the node server and check that the database is connected
```
$ node server.js
```

2. Open a web browser (preferably Chrome) and enter "127.0.0.1:3000" in the url space

3. Go to "127.0.0.1:3000/register" to register and add your own image

4. Go to "127.0.0.1:3000/user" to access user settings.


