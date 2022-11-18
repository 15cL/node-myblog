

// 校验用户名和密码
exports.validateUerPwd = (req, res, next) => {
  let str = [req.body.username, req.body.password]
  str.map(v => {
    let reg = /^[\S]{6,12}$/
    let isOk = reg.test(v)
    if (!isOk) {
      return res.staSend(1, '用户名或密码不合法')
    }
  })
  next()
}

