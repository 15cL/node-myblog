const express = require("express");

const router = express.Router();

const { getAllMsg, addMsg, delMsg } = require("../router_handler/msg");

// 获取所有留言
router.get("/all", getAllMsg);

// 添加留言
router.post("/add", addMsg);

// 删除留言
router.post("/del", delMsg);

module.exports = router;
