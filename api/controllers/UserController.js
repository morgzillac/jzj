/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

/*
'use strict';

var _ = require("lodash");

module.exports = _.merge(_.cloneDeep(require("../services/BaseController")), {
*/

  module.exports = {

/*


 */

  login: function (req, res) {

    var password = req.param('password');
    var username = req.param('login');

    var bcrypt = require('bcrypt');

    User.findOne({userLogin:username}).exec(function (err, user) {
      if (err) res.customError('500', sails.config.errs.systemError('数据库错误'));

      if (user) {
        bcrypt.compare(password, user.password, function (err, match) {
          if (err) res.customError('500', sails.config.errs.systemError());

          if (match) {
            // password match
            var token = UtilsService.uid(5);
            console.log('match found!!!' + token );

            //todo: line below is for testing only, need to be removed
            token = 123;  //user.userId;

            AccessToken.create({userId:user.userId, token:token,
                                  payPassword:user.payPassword })
                .exec(function createCB(err) {
              if (err) {
                res.customError('500', sails.config.errs.systemError('写入Token错误'));
                console.log(err);
              }
              //console.log(AccessToken);
            });
            res.set('token',token);

            //todo: remove following for production
            res.set('Access-Control-Allow-Origin', '*');
            res.set("Access-Control-Allow-Methods', 'POST, GET");
            res.set('Custom-Header', 'Own-Data');
            res.set('Access-Control-Expose-Headers', 'Custom-Header');
            // end of removing part

            res.json(user);
          } else {
            // invalid password
            res.customError('500', sails.config.errs.login_password_wrong);
          }
        });
      } else {
        res.customError('500', sails.config.errs.login_username_notfound);
      }
    });
  },


  logout: function (req, res) {

    AccessToken.destroy({token:req.userData.token}).exec(function (err, userData) {
      if (err) {
        console.log(err);
      } else {
        console.log(userData);
      }
      res.ok();
    });

  },

    resetPasswordRequest: function (req, res){

      var email = req.param('email');
      if (!email) return res.serverError("没有邮箱");
//todo: add check email

      var code = UtilsService.encrypt(email);
      var port = "";
      if (req.port) port = ":" + req.port;
      var url = req.host + port + '/#/access/resetpwd?code=' + code;

      var locals = {
        templateName: sails.config.email.resetPW.templateName,
        subject: sails.config.email.resetPW.subject,
        to: req.param('email'),
        data: {
          url: url
        }
      };
      EmailService.sendEmail(locals);

      res.ok();

    },

    resetPassword: function (req, res) {

      if (req.method.toUpperCase()=='GET') {
        res.view('forgotpw');
      } else {
        var thecode = req.param('thecode');
        var email = req.param('email');
//todo: add check email
        var bcrypt = require('bcrypt');
console.log(email, thecode);
        bcrypt.compare(email, thecode, function (err, match) {
          if (err) return res.customError('500', res.serverError("系统错误"));
          if (match) {
            var record = {};
            if (req.param('password')) {
              record.password = req.param('password');
              console.log(record);
            }
            if (req.param('payPassword')) {
              record.payPassword = req.param('payPassword');
            }
            User.update({"email": email}, record).exec(function (err, userData) {
              if (err) {
                console.log(err);
                res.customError('500', sails.config.errs.systemError(sails.config.errs.db_reset_password_err));
              } else {
                console.log(userData);
              }
              res.ok();
            });
          } else {
            console.log('no match');
            res.serverError("重置密码错误");
          }
        });

      }
    },

  register: function (req, res) {
  }

};

