const db = require("../db/index");
const { errSend } = require("../utills/index");

// 获取所有留言
exports.getAllMsg = (req, res) => {
  let sql = `select * from msgs order by id desc`;
  db.query(sql, (err, result) => {
    errSend(res, err, [1], "获取所有留言失败");
    return res.staSend(0, "获取所有留言成功", result);
  });
};

// 添加留言
exports.addMsg = (req, res) => {
  let { name, avatar_url, detail, article_id } = req.body;
  let createtime = new Date();
  let obj = { name, avatar_url, detail, createtime, article_id };
  let sql = `insert into msgs set ?`;
  db.query(sql, obj, (err, result) => {
    errSend(res, err, result, "添加留言失败");
    return res.staSend(0, "添加留言成功");
  });
};

// 删除留言
exports.delMsg = (req, res) => {
  let id = req.body.id;
  let sql = `delete from msgs where id = ?`;
  db.query(sql, id, (err, result) => {
    errSend(res, err, result, "删除留言失败");
    return res.staSend(0, "删除留言成功");
  });
};
