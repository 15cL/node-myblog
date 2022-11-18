const fs = require('fs')

exports.httpSend = (res, err, result, tip) => {
  if (err) {
    return res.staSend(1, err.message)
  }
  if (result.length && result.length !== 1) {
    return res.staSend(1, tip)
  }
  if (result.affectedRows && result.affectedRows !== 1) {
    return res.staSend(1, tip)
  }
}

// 将图片上传服务端，转化为图片路径，将图片路径上传到数据库
exports.buffer = (res, avatar) => {

  //过滤data:URL
  let base64url = avatar.replace(/^data:image\/\w+;base64,/, "")
  let dataBuffer = new Buffer.from(base64url, 'base64')

  // 存储文件命名是使用当前时间，防止文件重名
  let saveUrl = '/utills/img/' + (new Date()).getTime() + ".png"

  fs.writeFile(saveUrl, dataBuffer, (err) => {
    if (err) {
      return res.staSend(1, err.message)
    }
    return saveUrl.slice(7)
  })
}
