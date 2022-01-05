const mysql = require('mysql')

const pool = mysql.createPool ({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',    // use your own user
    password: '', // use you own password
    database: 'nodedb' // create you own database
})

module.exports = pool 
