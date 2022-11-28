//创建服务器
const express = require("express");
const app = express();

// 跨域
const cors = require("cors");

// 解析表单数据的中间件，
app.use(express.urlencoded({ extended: false }));

// # 解析json编码数据
app.use(express.json());

app.use(cors()); //跨域

// 处理get请求参数
const url = require("url");
// 注册send中间间
app.use((req, res, next) => {
  
  // 处理get请求参数
  if (req.method == "GET") {
    const qu = url.parse(req.url, true);
    req.body = qu.query;
  }
  // 输出 JSON 格式
  // res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });//设置response编码为utf-8

  res.staSend = (status, message, obj) => {
    // 判断obj是否为多级数组
    const getlevel = (obj) => {
      return Array.isArray(obj) ? Math.max(...obj.map(getlevel)) + 1 : 0;
    };

    if (getlevel(obj) >= 1) {
      return res.send({ status, message, data: obj });
    } else {
      return res.send({ status, message, ...obj });
    }
  };
  next();
});

// 统一设置响应头
app.all("*", (req, res, next) => {
  // 输出 JSON 格式
  res.setHeader("Content-Type", "application/json;charset=utf-8"); //设置response编码为utf-8

  next();
});

// 在路由前配置解析token
const JWTtoken = require("./JWTtoken");
app.use(JWTtoken.parseJWT());

// 导入并注册用户路由模块
const userRouter = require("./router/user");
app.use("/user", userRouter);

// 导入并注册用户信息模块
const myRouter = require("./router/userinfo");
app.use("/my", myRouter);

// 导入并注册标签云模块
const tagRouter = require("./router/tags");
app.use("/tag", tagRouter);

// 导入并注册文章模块
const articleRouter = require("./router/article");
app.use("/article", articleRouter);

// 导入并注册分类模块
const catesRouter = require("./router/cate");
app.use("/cate", catesRouter);

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.staSend(401, "身份认证失败！");
  }

  res.staSend(1, err.message);
});

app.listen(3000, () => {
  console.log("服务器已启动 http://127.0.0.1:3000");
});
