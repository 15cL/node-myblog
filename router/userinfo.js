
const express = require("express")

const router = express()

const { getUserInfo, updateUserInfo, updatePwd } = require('../router_handler/userinfo')

const { validateID, validateEmail, validateNickname, validatePwd } = require('../schema/userinfo')

// 获取用户信息
router.get('/userinfo', getUserInfo)

// 更新用户信息
router.post('/userinfo', [validateID, validateEmail, validateNickname], updateUserInfo)

// 重置密码
router.post('/updatepwd', validatePwd, updatePwd)

module.exports = router