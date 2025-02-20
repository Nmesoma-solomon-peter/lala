// const mysql = require("mysql2");
require("dotenv").config();
const sequelize = require('sequelize');
const db = new sequelize(process.env.DB_DBNAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,
    {host:'localhost',dialect:'mysql'})

const connection = ()=>{
    db.authenticate()
    .then(()=>{
        console.log("successfully connected to the database");
    })
    .catch((err)=>{
        console.log("connection to the database failed: ", err.message);
    })
}
connection()
module.exports = db;