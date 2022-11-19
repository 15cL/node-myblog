
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
  // 输出 JSON 格式
  // res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });//设置response编码为utf-8

  res.staSend = (status, message, obj) => {

    // 判断obj是否为多级数组
    const getlevel = obj => {
      return Array.isArray(obj) ? Math.max(...obj.map(getlevel)) + 1 : 0
    }
    console.log(getlevel(obj));

    if (getlevel(obj) >= 1) {

      return res.send({ status, message, data: obj })
    } else {
      return res.send({ status, message, ...obj })
    }
  }
  next()
})

// 统一设置响应头
app.all('*', (req, res, next) => {
  // 输出 JSON 格式
  res.setHeader("Content-Type", "application/json;charset=utf-8");//设置response编码为utf-8

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


const tagRouter = require('./router/tags')
app.use('/tag', tagRouter)


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