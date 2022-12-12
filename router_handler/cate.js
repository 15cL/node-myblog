const db = require("../db/index");
const { errSend } = require("../utills/index");

// 获取所有分类
exports.getCates = (req, res) => {
  let sql = `select * from cates order by id desc`;
  db.query(sql, (err, result) => {
    errSend(res, err, [1], "获取分类失败！");
    return res.staSend(0, "获取分类成功", result);
  });
};

//新增分类
exports.addCates = (req, res) => {
  let has = false;
  let sql = `select * from cates `;
  db.query(sql, (err, result) => {
    result.map((v) => {
      if (v.name == req.body.cateName) {
        has = true;
      }
    });
    if (has) {
      return res.staSend(1, "当前分类已存在");
    }
    errSend(res, err, [0], "新增分类失败");

    let sql = `insert into cates set name=?`;
    db.query(sql, req.body.cateName, (err, result) => {
      errSend(res, err, result, "新增分类失败！");
      return res.staSend(0, "新增分类成功");
    });
  });
};

// 删除分类
exports.delCates = (req, res) => {
  let sql = `delete from cates where id=?`;
  db.query(sql, req.body.id, (err, result) => {
    errSend(res, err, result, "删除分类失败");
    return res.staSend(0, "删除分类成功");
  });
};

//更新分类
exports.updateCates = (req, res) => {
  let has = false;
  let sql = `select * from cates `;
  db.query(sql, (err, result) => {
    result.map((v) => {
      if (v.name == req.body.cateName) {
        has = true;
      }
    });
    if (has) {
      return res.staSend(1, "当前分类已存在");
    }

    errSend(res, err, [0], "更新分类失败");
    // 更新
    let sql = `update cates set name=? where id=?`;
    db.query(sql, [req.body.cateName, req.body.id], (err, result) => {
      errSend(res, err, result, "更新分类失败");
      return res.staSend(0, "更新分类成功");
    });
  });
};

//查找分类文章
exports.getCateArticle = (req, res) => {
  let sql = `select * from articles where cate_id like ? or cate_id like ? or cate_id like ? or cate_id like ?`;
  db.query(
    sql,
    [
      `[${req.body.id}]`,
      `%,${req.body.id}]`,
      `[${req.body.id},%`,
      `%,${req.body.id},%`,
    ],
    (err, result) => {
      errSend(res, err, [1], "获取分类文章失败");
      return res.staSend(0, "获取分类文章成功", result);
    }
  );
};
