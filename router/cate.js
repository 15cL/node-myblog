const express = require("express");
const {
  updateCates,
  addCates,
  delCates,
  getCates,
  getCateArticle
} = require("../router_handler/cate");
const { validateCateName } = require("../schema/cate");

const router = express.Router();

// 获取所有类
router.get("/all", getCates);

// 添加新的类
router.post("/new",validateCateName, addCates);

// 更新类名
router.post("/update",validateCateName, updateCates);

// 删除类名
router.post("/del", delCates);

// 获取类文章
router.get('/article',getCateArticle)

module.exports = router;
