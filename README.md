# faceapi-website

This project, using <a href="https://github.com/justadudewhohacks/face-api.js/">faceapi</a>, is a proof-of-concept website.
The website uses a mysql database to store users registration information

## Installation
1. Install <a href="https://nodejs.org/en/download/">node.js</a>.

2. Install <a href="https://dev.mysql.com/downloads/mysql/">mysql server</a>

2a. Set up mysql server, creating 1 database: "logs", and 2 tables: "logs" and "users". Follow the commands in "/public/commands.sql"

3. Install additional required npm modules (multer, rimraf, body-parser)
```
$ cd node_modules
$ npm install <module_name>
```

4. Clone this repository
```
$ git clone https://github.com/kennethsoh/faceapi-website.git
$ cd faceapi-website
```


