
//创建服务器
const express = require('express')
const app = express()

// // 跨域
// const cors = require('cors')
// app.use(cors)

// 解析表单数据的中间件，
app.use(express.urlencoded({ extended: false }))

// 注册send中间间
app.use((req, res, next) => {
  res.staSend = (status, message, obj) => {

    res.send({ status, message, ...obj })
  }
  next()
})

// 在路由前配置解析token
const JWTtoken = require('./JWTtoken')
app.use(JWTtoken.parseJWT())



// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/user', userRouter)


// 导入获取用户信息模块
const myRouter = require('./router/userinfo')
app.use('/my', myRouter)



// 定义错误级别的中间件
app.use((err, req, res, next) => {

  if (err.name === 'UnauthorizedError') {

    return res.staSend(401, '身份认证失败！')
  }

  res.staSend(1, err.message)
})

app.listen(80, () => {
  console.log("服务器已启动 http://127.0.0.1");
})