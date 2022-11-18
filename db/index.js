
// 建立数据库连接
const mysql = require("mysql")

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: '1234567',
  database: 'myblog'
})

module.exports = db