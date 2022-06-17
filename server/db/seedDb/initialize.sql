CREATE DATABASE groupchat_testing

USE groupchat_testing

CREATE TABLE courses(
`id` int NOT NULL AUTO_INCREMENT,
`full` VARCHAR(10),
`code` VARCHAR(6),
`title` VARCHAR(150),
`session` JSON,
`lectures` JSON,
PRIMARY KEY(`id`),
INDEX (`code`)
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;