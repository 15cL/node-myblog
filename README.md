# node-myblog

# 2022/11/18  
         注册          Url: /user/register   Method: POST  Body: { username , password } 
         
         登录          Url：/user/login      Method: POST  Body: { username , password } 
         
      获取用户信息      Url：/my/userinfo     Method：Get   需登录
      
      修改用户信息      Url：/my/update/userinfo     Method：Post  Body：{ id, nickname, email }   需登录 
      
       修改密码        Url：/my/update/pwd     Method：Post  Body:{ oldPwd , newPwd }        需登录 
