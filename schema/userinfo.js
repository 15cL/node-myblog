
// 校验ID
exports.validateID = (req, res, next) => {
  let str = req.body.id;
  let reg = /^[1-9][0-9]{0,}$/;
  let isOk = reg.test(str);
  if (!isOk) {
    return res.staSend(1, "ID不合法");
  }
  next();
};

// 校验昵称
exports.validateNickname = (req, res, next) => {
  let isStr = typeof req.body.nickname == "string";
  if (!isStr) {
    return res.staSend(1, "昵称不合法");
  }
  next();
};

// 校验邮箱
exports.validateEmail = (req, res, next) => {
  let email = req.body.email;
  if (email) {
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    let isOk = email.match(reg);
    if (!isOk) {
      return res.staSend(1, "邮箱不合法");
    }
  }
  next();
};

// 校验新旧密码
exports.validatePwd = (req, res, next) => {
  let str = [req.body.oldPwd, req.body.newPwd];
  str.map((v) => {
    let reg = /^[\S]{6,12}$/;
    let isOk = reg.test(v);
    if (!isOk) {
      return res.staSend(1, "旧密码或新密码长度应为6~12位");
    }
  });
  if (str[0] === str[1]) {
    return res.staSend(1, "新密码不能与旧密码相同");
  }
  next();
};

// 校验图片url格式
exports.validateAvatar = (req, res, next) => {
  let str = typeof req.body.avatar.url === "string";
  if (!str) {
    return res.staSend(1, "图片格式错误");
  }
  next();
};
