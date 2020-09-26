/* Create SQL Table */
CREATE TABLE IF NOT EXISTS logs.logs (`logid` INT NOT NULL AUTO_INCREMENT,`name` VARCHAR(64) NOT NULL,`date` VARCHAR(64) NOT NULL,PRIMARY KEY (`logid`));

CREATE TABLE IF NOT EXISTS logs.users (`userid` INT NOT NULL AUTO_INCREMENT,`username` VARCHAR(64) NOT NULL,`password` VARCHAR(64) NOT NULL,`imagelink` VARCHAR(64) NOT NULL,PRIMARY KEY (`userid`));

/* Show Tables */
SHOW TABLES;

/* Describe Table */
DESCRIBE logs.logs;
DESCRIBE logs.users;

/* Select all from Table */
SELECT * FROM logs.logs;
SELECT * FROM logs.users;

/* Delete all data from Table: */
DELETE FROM logs.logs;
DELETE FROM logs.users;

/* Drop Table */
DROP TABLE logs.logs;
DROP TABLE logs.users;