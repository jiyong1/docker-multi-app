const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: '0rladlrtmd!',
    database: 'myapp'
});

exports.pool = pool;