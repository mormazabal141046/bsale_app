const mysql = require('mysql');
require('dotenv').config()


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DB_NAME,
});

connection.connect(error=>{
    if(error) throw error;
    console.log("Conexion a Base de Datos Correctamente!")
});

module.exports = connection;