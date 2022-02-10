# webserive_nodejs Readme
This simple resume RESTful web service is implemented using Node.js, ExpressJS framework and MySQL database.

## 1 Introduction
The simple resume service demo shows how to write the RESTful CRUD (create, read, update, delete) APIs.

## 2 Pre-requisite
On MacOS
```
$ brew update
$ brew install mysql
$ /usr/local/bin/mysql -u root -p  # enter password
mysql > ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

mysql> flush privileges;

mysql> CREATE DATABASE resumedb;
mysql> USE resumedb;
mysql> CREATE TABLE IF NOT EXISTS `resumes` ( 
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL, 
    firstname varchar(255) NOT NULL, 
    lastname varchar(255) NOT NULL, 
    title varchar(255) NOT NULL, 
    company v255) NOT NULL, 
    description varchar(1024) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;

mysql> CREATE TABLE IF NOT EXISTS `users` (username varchar(255) NOT NULL PRIMARY KEY, 
    -> email varchar(255) NOT NULL,
    -> fullname varchar(255) NOT NULL,
    -> disabled BOOLEAN DEFAULT false,
    -> hashedpassword varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;

```

## 3 How to run the app
```bash 
$ npm install
```

```
$ npm start
```


