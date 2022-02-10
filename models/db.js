const mysql = require("mysql");

const dbConfig = require("../config/db.config.js")

// create a connection 
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//open MySQL connection
connection.connect( function(error) {
    if (error) throw error;
    console.log("Successfully connected to mysql database.");
})

module.exports = connection;