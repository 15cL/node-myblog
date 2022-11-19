
// 校验tagName格式
exports.validateReq = (req, res, next) => {
  let isName = typeof (req.body.name) === 'string'
  let isAuthor = typeof (req.body.author) === 'string'
  let isDetail = typeof (req.body.detail) === 'string'

  if (!isName || !isAuthor || !isDetail) {
    return res.staSend(1, '请求参数错误')
  }
  next()
}

