// 校验tagName格式
exports.validateCateName = (req, res, next) => {
  let str = typeof (req.body.cateName) === 'string'

  if (!str) {
    return res.staSend(1, '分类格式错误')
  }
  next()
}