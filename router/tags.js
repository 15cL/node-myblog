

const express = require('express')

const router = express.Router()

const { getTags, addTags, delTags, updateTags } = require('../router_handler/tags')

// 获取所有标签
router.get('/all', getTags)

// 新增标签
router.post('/new', addTags)

// 删除标签
router.post('/del', delTags)

router.post('/update', updateTags)


module.exports = router