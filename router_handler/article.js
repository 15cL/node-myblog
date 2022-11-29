const db = require("../db/index");

const { errSend, removeProNull } = require("../utills/index");
const { buffer } = require("../utills/index");
const fs = require("fs");

function updatePic(req, res, id) {
  if (id) {
    let sqll = `select article_avatar from articles where id=?`;
    db.query(sqll, id, (err, result) => {
      errSend(res, err, result, "修改头像失败");

      // 删除上一张保存的图片
      fs.unlinkSync("D:\\前端\\" + result[0].article_avatar);
    });
  }
  return buffer(res, req.body.article_avatar, "article_pic");
}

// 添加文章
exports.addArticle = (req, res) => {
  let { name, author, article_avatar, detail, tag_id, cate_id } = req.body;

  // base64转服务器图片路径，存储到数据库
  article_avatar = updatePic(req, res, 0);

  let sql = `insert into articles set ?`;

  let obj = { name, author, article_avatar, detail, tag_id, cate_id };

  //剔除null的键值对
  let noNullObj = removeProNull(obj);

  // 添加创建时间key
  noNullObj["createdate"] = new Date();

  db.query(sql, noNullObj, (err, result) => {
    errSend(res, err, result, "新增文章失败！");

    res.staSend(0, "新增文章成功");
  });
};

// 更新文章
exports.updateArticle = (req, res) => {
  let { name, author, article_avatar, detail, id, tag_id, cate_id } = req.body;

  // base64转服务器图片路径，存储到数据库
  article_avatar = updatePic(req, res, id);

  let obj = { name, author, article_avatar, detail, tag_id, cate_id };

  //剔除null的键值对
  let noNullObj = removeProNull(obj);

  let sql = `update articles set ? where id=?`;

  db.query(sql, [noNullObj, id], (err, result) => {
    errSend(res, err, result, "更新文章失败！");

    res.staSend(0, "更新文章成功");
  });
};

// 删除文章
exports.delArticle = (req, res) => {
  let sql = `delete from articles where id=?`;

  db.query(sql, req.body.id, (err, result) => {
    errSend(res, err, result, "删除文章失败");

    return res.staSend(0, "删除文章成功");
  });
};

// 根据”id字段“排序，倒叙输出tablename表中的数据。
// 备注：asc是表示升序，desc表示降序
// 获取所有文章
exports.getArticle = (req, res) => {
  let sql = `select * from articles order by id desc`;
  db.query(sql, (err, result) => {
    errSend(res, err, [0], "获取文章失败");
    return res.staSend(0, "获取文章成功", result);
  });
};

// 获取热门文章   limit限制查询数量
exports.getHotArticle = (req, res) => {
  let sql = `select * from articles order by traffic desc limit 5`;
  db.query(sql, (err, result) => {
    errSend(res, err, [0], "获取热门文章失败");
    return res.staSend(0, "获取热门文章成功", result);
  });
};


//搜索
exports.getAboutArticle = (req, res) => {
  let info = req.body.info;
  let sql = `select * from articles where concat(name,author,createdate,detail) like ?`;
  db.query(sql, `%${info}%`, (err, result) => {
    errSend(res, err, [1], "搜索失败");
    console.log(result);
    return res.staSend(0, "搜索成功", result);
  });
};
