const fs = require("fs");
const db = require("../db/index");

exports.errSend = (res, err, result, tip) => {
  if (err) {
    return res.staSend(1, err.message);
  }
  if (result.length && result.length !== 1) {
    return res.staSend(1, tip);
  }
  if (result.affectedRows && result.affectedRows !== 1) {
    return res.staSend(1, tip);
  }
};

// 将图片上传服务端，转化为图片路径，将图片路径上传到数据库
exports.buffer = (req, res, avatar, pathMy, id, way = "no") => {
  const Key = pathMy == "article_pic" ? "+1999100599999" : "+1999111299999";

  const path = "./public/" + pathMy + "/";

  // 获取目标文件夹中的所有图片
  let files = fs.readdirSync(path);

  // 当不是新增文章时
  if (way !== "add") {
    // 删除替换前的图片
    if (files.length > 0) {
      let sql = `select article_avatar from articles where id =?`;
      db.query(sql, id, (err, result) => {
        if (err) {
          return res.staSend(1, err.message);
        }
        let delPath = result[0].article_avatar;
          files.map((v) => {
            if (delPath.includes(v)) {
              fs.unlinkSync(delPath);
            }
           else if (v.includes(req.user.id + "+" + id + "+" + Key)) {
              fs.unlinkSync(path + v);
            }
          });
      })

      // files.map((v) => {
      //   if (v.includes(req.user.id + "+" + id + "+" + Key)) {
      //     fs.unlinkSync(path + v);
      //   }
      // });
    }
  }

  //过滤data:URL、
  let base64url = avatar["url"].replace(/^data:image\/\w+;base64,/, "");
  let dataBuffer = new Buffer.from(base64url, "base64");

  // 存储文件命名是使用当前时间，防止文件重名
  let saveUrl =
    path + req.user.id + "+" + id + "+" + Key + Date.now() + avatar.name;

  fs.writeFile(saveUrl, dataBuffer, (err) => {
    if (err) {
      return res.staSend(1, err.message);
    }
  });
  return saveUrl;
};

// 删除对象中值为null的key
exports.removeProNull = (obj) => {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (!obj[key]) {
        delete obj[key];
      }
    }
  }
  return obj;
};
