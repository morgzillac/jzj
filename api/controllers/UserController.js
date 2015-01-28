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

            AccessToken.create({userId:user.userId, token:token}).exec(function createCB(err) {
              if (err) {
                res.customError('500', sails.config.errs.systemError('写入Token错误'));
                console.log(err);
              }

            });
            res.set('token',token);
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
  },

  register: function (req, res) {
  }

};

