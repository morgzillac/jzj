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

    resetPassword: function (req, res) {

      var email = req.param('email');
      var record = {};
      if (req.param('password')) {
        record.password = req.param('password');
        console.log(record);
      }
      if (req.param('payPassword')) {
        record.payPassword = req.param('payPassword');
      }
      User.update({"email":email},record).exec(function (err, userData) {
        if (err) {
          console.log(err);
          res.customError('500', sails.config.errs.systemError(sails.config.errs.db_reset_password_err));
        } else {
          console.log(userData);
        }
        res.ok();
      });

    },

  register: function (req, res) {
  }

};

