const express = require("express");
const router = express.Router();

const {
  getTags,
  addTags,
  delTags,
  updateTags,
  getArticle,
} = require("../router_handler/tags");

const { validateTagName } = require("../schema/tag");

// 获取所有标签
router.get("/all", getTags);

// 新增标签
router.post("/new", validateTagName, addTags);

// 删除标签
router.post("/del", delTags);

// 更新标签
router.post("/update", validateTagName, updateTags);

//根据标签
router.get("/article", getArticle);

module.exports = router;
