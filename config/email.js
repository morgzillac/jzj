/**
 * Created by mcheng on 1/30/15.
 */module.exports.email = {

  transport: {
    service: 'gmail',
    auth: {user: "jzj@hyperbridge.com", pass: "juzhuanjie"},
    templateDir: '../services/email_tpls',
    from: '',
    testMode: true
  },

  welcome: {
    templateName:'welcome',
    subject: '欢迎加入聚赚届',
    params: ['first','last']

  },

  resetPW: {
    templateName:'resetPW',
    subject: '聚赚届重置密码',
    params: ['url']
  }


};

