
const db = require('../db/index')
const { errSend } = require('../utills/index')


// 获取所有标签
exports.getTags = (req, res) => {

  let sql = `select * from tags`
  db.query(sql, (err, result) => {
    errSend(res, err, [1], '获取标签失败！')
    return res.staSend(0, '获取标签成功', result)
  })
}

//新增标签 
exports.addTags = (req, res) => {
  let has = false
  let sql = `select * from tags `
  db.query(sql, (err, result) => {
    result.map(v => {
      if (v.name == req.body.tagName) {
        has = true
      }
    })
    if (has) {
      return res.staSend(1, '当前标签已存在')
    }
    errSend(res, err, [0], '新增标签失败')

    let sql = `insert into tags set name=?`
    db.query(sql, req.body.tagName, (err, result) => {
      errSend(res, err, result, '新增标签失败！')
      return res.staSend(0, '新增标签成功')
    })
  })
}

// 删除标签
exports.delTags = (req, res) => {
  let sql = `delete from tags where id=?`
  db.query(sql, req.body.id, (err, result) => {
    errSend(res, err, result, '删除标签失败')
    return res.staSend(0, '删除标签成功')
  })
}

//更新标签
exports.updateTags = (req, res) => {

  let has = false
  let sql = `select * from tags `
  db.query(sql, (err, result) => {
    result.map(v => {
      if (v.name == req.body.tagName) {
        has = true
      }
    })
    if (has) {
      return res.staSend(1, '当前标签已存在')
    }

    errSend(res, err, [0], '新增标签失败')
    // 更新
    let sql = `update tags set name=? where id=?`
    db.query(sql, [req.body.tagName, req.body.id], (err, result) => {
      httpSend(res, err, result, '更新标签失败')
      return res.staSend(0, '更新标签成功')

    })
  })

}