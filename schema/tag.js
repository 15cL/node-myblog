
// 校验tagName格式
exports.validateTagName = (req, res, next) => {
  let str = typeof (req.body.tagName) === 'string'

  if (!str) {
    return res.staSend(1, '标签格式错误')
  }
  next()
}