
// 创建路由对象
const express = require('express')
const router = express.Router()

const { validateUerPwd } = require('../schema/user')

// 导入方法
const user_handler = require('../router_handler/user')

//注册
router.post('/register', validateUerPwd, user_handler.register)

//登录
router.post('/login', validateUerPwd, user_handler.login)

module.exports = router