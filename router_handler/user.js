

// 导入数据库操作模块
const db = require('../db/index')

// 导入加密模块
const bcryptjs = require('bcryptjs')

const token = require('../JWTtoken')

exports.register = (req, res) => {
  const userInfo = req.body

  //查询语句
  const sql = `select * from users where username = ?`

  db.query(sql, [userInfo.username], (err, result) => {

    // 执行sql语句失败
    if (err) {
      return res.staSend(1, err.message)
    }

    //用户名被占用
    if (result.length > 0) {
      return res.staSend(1, '用户名被占用，请更换其他用户名')
    }

    // 调用 bcryptjs.hashSync() 对密码加密
    userInfo.password = bcryptjs.hashSync(userInfo.password, 10)

    //插入语句
    const sql = `insert into users set ?`

    db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, result) => {

      // sql执行失败
      if (err) {
        return res.send({ status: 1, message: err.message })
      }
      // 影响行数
      if (result.affectedRows !== 1) {
        return res.staSend(1, '注册用户失败，请稍后再试')
      }

      res.staSend(0, "注册成功")
    })
  })
}


exports.login = (req, res) => {
  let userInfo = req.body
  const sql = `select * from users where username=?`

  db.query(sql, userInfo.username, (err, result) => {

    if (err) {
      return res.staSend(1, err.message)
    }


    if (result.length !== 1) {
      return res.staSend(1, '登陆失败!')
    }

    const compareResult = bcryptjs.compareSync(userInfo.password, result[0].password)
    if (!compareResult) {
      return res.staSend(1, '密码错误!')
    }
    let jwtToken = token.jwt(result[0])
    res.staSend(0, '登录成功', { token: jwtToken })

  })
}