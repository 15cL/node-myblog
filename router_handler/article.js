const db = require("../db/index");

const { errSend, removeProNull } = require("../utills/index");
const { buffer } = require("../utills/index");
const fs = require("fs");

// 添加文章
exports.addArticle = (req, res) => {
  let { name, author, article_avatar, detail, tag_id, cate_id } = req.body;

  // base64转服务器图片路径，存储到数据库
  // article_avatar = updatePic(req, res, 0);
  article_avatar = JSON.parse(article_avatar);
  if (article_avatar) {
    article_avatar = buffer(req, res, article_avatar, "article_pic", "add");
  }

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

  let obj = { name, author, detail, tag_id, cate_id };
  if (!article_avatar.includes("./public")) {
    article_avatar = JSON.parse(article_avatar);

    // base64转服务器图片路径，存储到数据库
    article_avatar = buffer(req, res, article_avatar, "article_pic");
    obj["article_avatar"] = article_avatar;
  }
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
  let sql0 = `select article_avatar from articles where id=?`;
  db.query(sql0, req.body.id, (err, result0) => {
    errSend(res, err, result0, "删除图片失败");
    fs.unlinkSync(result0[0].article_avatar);
  });
  let sql1 = `delete from msgs where article_id=?`;
  db.query(sql1, req.body.id, (err, result1) => {
    errSend(res, err, result1, "删除文章留言失败");
  });
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
    return res.staSend(0, "搜索成功", result);
  });
};

//获取文章下留言
exports.getArticleMsg = (req, res) => {
  let sql = `select * from msgs where article_id = ? order by createtime desc`;
  db.query(sql, req.body.id, (err, result) => {
    let num = result.length;
    let sql0 = `update articles set msg_num = ? where id = ${req.body.id}`;
    db.query(sql0, num, (err, result0) => {
      errSend(res, err, [1], "获取文章留言失败");
      return res.staSend(0, "获取文章留言成功", result);
    });
  });
};

//计算文章流量
exports.inserTraffic = (req, res) => {
  let sql = `select traffic from articles where id = ?`;
  db.query(sql, req.body.id, (err, result) => {
    let traffic = result[0].traffic + 1;
    let sql0 = `update articles set traffic=? where id =?`;
    db.query(sql0, [traffic, req.body.id], (res0, result0) => {
      errSend(res, err, [1], "计算文章流量失败");
      return res.staSend(0, "计算文章留言成功", result0);
    });
  });
};

// 获取文章大图
exports.getAvatar = (req, res) => {
  let sql = `select article_avatar from articles where id= ?`;
  db.query(sql, req.body.id, (err, result) => {
    errSend(res, err, [1], "获取文章大图失败");
    const data = fs.readFile(
      result[0].article_avatar,
      "binary",
      function (err, data) {
        if (err) {
          res.send("文章大图失败");
        } else {
          return res.staSend(0, "获取文章大图成功", {
            baseUrl: Buffer.from(data, "binary").toString("base64"),
          });
        }
      }
    );
  });
};
