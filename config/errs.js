
module.exports.errs = {

  systemError: function (msg) {
    var retMsg = '系统错误';
    if (msg) retMsg += ': ' + msg;
    return {
      code:"system_error",
      message: retMsg
    };
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

  db_userdata_not_found:{
    code: "db_userdata_not_found",
    message: "用户数据没找到!"
  }

};
