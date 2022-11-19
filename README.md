# node-myblog

# 2022/11/18  v2 用户注册登录，以及用户信息
         注册          Url: /user/register          Method: POST  Body: { username , password } 
         
         登录          Url：/user/login             Method: POST  Body: { username , password } 
         
      获取用户信息      Url：/my/userinfo            Method：Get              需登录
      
      修改用户信息      Url：/my/update/userinfo     Method：Post  Body：{  nickname, email }      需登录 
      
       修改密码        Url：/my/update/pwd           Method：Post  Body:{ oldPwd , newPwd }        需登录 
       
       修改头像          Url：/my/update/avatar       Method：Post  Body :{ avatar }  base64格式    需登录             


# 2022/11/19 v2  标签云
       获取所有标签        Url: /tag/all              Method：Get

        更新标签           Url: /tag/update          Method：Post    Body :{ id }                  需登录

        新增标签           Url: /tag/new             Method: Post    Body :{ id ,tagName }         需登录

        删除标签           Url: /tag/del             Method: Post    Body : { id }                 需登录

