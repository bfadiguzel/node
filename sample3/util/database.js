const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'192.168.1.56',
    port: 3306,
    user:'admin',
    password:'1234',
    database:'node-complate'
    
})



module.exports = pool.promise()