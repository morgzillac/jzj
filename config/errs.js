
module.exports.errs = {

  systemError: function (msg) {
    var retMsg = '系统错误';
    if (msg) retMsg += ': ' + msg;
    return {
      code:"system_error",
      message: retMsg
    };
  },


  user_email_found:{
    code: "user_email_found",
    message: "输入的邮箱已存在！"
  },

  user_login_found:{
    code: "user_login_found",
    message: "输入的登陆名已存在！"
  },

  user_email_notfound:{
    code: "user_email_notfound",
    message: "输入的邮箱不存在！"
  },

  param_email_notfound:{
    code: "param_email_notfound",
    message: "必须输入邮箱！"
  },

  login_username_notfound:{
    code: "login_username_notfound",
    message: "用户没找到！"
  },

  login_password_wrong:{
    code: "login_password_wrong",
    message: "密码错误!"
  },

  access_notloggedin:{
    code: "access_notloggedin",
    message: "未登录!"
  },

  access_notTheUser:{
    code: "access_notTheUser",
    message: "不是当前登陆用户!"
  },

  db_userdata_not_found:{
    code: "db_userdata_not_found",
    message: "用户数据没找到!"
  },

  db_reset_password_err:{
    code: "db_reset_password_err",
    message: "密码重置失败!"
  }


};
