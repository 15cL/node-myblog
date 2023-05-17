const express = require("express");

const router = express.Router();

const {
  addArticle,
  updateArticle,
  delArticle,
  getArticle,
  getHotArticle,
  getAboutArticle,
  getArticleMsg,
  inserTraffic,
  getAvatar,
} = require("../router_handler/article");

const { validateReq } = require("../schema/article");
// 新增文章
router.post("/new", validateReq, addArticle);

// 更新文章
router.post("/update", updateArticle);

// 删除文章
router.post("/del", delArticle);

// 获取所有文章
router.get("/all", getArticle);

// 获取热门文章
router.get("/hot", getHotArticle);

// 搜索
router.get("/search", getAboutArticle);

// 获取文章下的留言
router.get("/msg", getArticleMsg);

// 修改文章浏览量
router.post("/traffic", inserTraffic);

// 获取文章大图
router.get("/getAvatar", getAvatar);

module.exports = router;
