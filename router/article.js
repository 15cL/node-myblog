

const express = require('express')

const router = express.Router()

const { addArticle, updateArticle, delArticle, getArticle } = require('../router_handler/article')

const { validateReq } = require('../schema/article')
// 新增文章
router.post('/new', validateReq, addArticle)

// 更新文章
router.post('/update', updateArticle)

// 删除文章
router.post('/del', delArticle)

// 获取所有文章
router.get('/all', getArticle)

module.exports = router