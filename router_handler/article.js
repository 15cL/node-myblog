
const db = require('../db/index')

const { errSend, removeProNull } = require('../utills/index')

// 添加文章
exports.addArticle = (req, res) => {
  let { name, author, unquote, article_avatar, detail, tag_id } = req.body

  let sql = `insert into articles set ?`

  let obj = { name, author, unquote, article_avatar, detail, tag_id }

  //剔除null的键值对
  let noNullObj = removeProNull(obj)

  // 添加创建时间key
  noNullObj['createdate'] = new Date()

  db.query(sql, noNullObj, (err, result) => {

    errSend(res, err, result, '新增文章失败！')

    res.staSend(0, '新增文章成功')

  })
}

// 更新文章
exports.updateArticle = (req, res) => {

  let { name, author, unquote, article_avatar, detail, id, tag_id } = req.body


  let obj = { name, author, unquote, article_avatar, detail, tag_id }

  //剔除null的键值对
  let noNullObj = removeProNull(obj)

  let sql = `update articles set ? where id=?`

  db.query(sql, [noNullObj, id], (err, result) => {

    errSend(res, err, result, '更新文章失败！')

    res.staSend(0, '更新文章成功')
  })
}

// 删除文章
exports.delArticle = (req, res) => {
  let sql = `delete from articles where id=?`

  db.query(sql, req.body.id, (err, result) => {

    errSend(res, err, result, '删除文章失败')

    return res.staSend(0, '删除文章成功')
  })

}

// 获取所有文章
exports.getArticle = (req, res) => {
  let sql = `select * from articles`
  db.query(sql, (err, result) => {

    errSend(res, err, [0], '获取文章失败')
    return res.staSend(1, '获取文章成功', result)
  })
}