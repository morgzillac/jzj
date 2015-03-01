/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var util = require('util'),
  actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');

  module.exports = {

    create: function (req, res) {

      var email = req.param('email') || '';
      var login = req.param('userLogin') || '';

      UtilsService.checkEmail(email, function(err, found) {
        if (err) return res.serverError(err);
        //console.log('error:',sails.config.errs.user_email_found);
        if (found) return res.serverError(sails.config.errs.user_email_found);
        UtilsService.checkLogin(login, function (err, found) {
          if (err) return res.serverError(err);
          if (found) return res.serverError(sails.config.errs.user_login_found);

          var Model = actionUtil.parseModel(req);

          // Create data object (monolithic combination of all parameters)
          // Omit the blacklisted params (like JSONP callback param, etc.)
          var data = actionUtil.parseValues(req);

          // Create new instance of model using data from params
          User.create(data).exec(function created(err, newInstance) {

            // Differentiate between waterline-originated validation errors
            // and serious underlying issues. Respond with badRequest if a
            // validation error is encountered, w/ validation info.
            if (err) return res.negotiate(err);

            // If we have the pubsub hook, use the model class's publish method
            // to notify all subscribers about the created item
            if (req._sails.hooks.pubsub) {
              if (req.isSocket) {
                Model.subscribe(req, newInstance);
                Model.introduce(newInstance);
              }
              Model.publishCreate(newInstance, !req.options.mirror && req);
            }

            // Send JSONP-friendly response if it's supported
            // (HTTP 201: Created)
            res.status(201);
            res.ok(newInstance.toJSON());
          });
        });
      });
    },


    login: function (req, res) {

    var password = req.param('password');
    var username = req.param('login');

    var bcrypt = require('bcrypt');

    User.findOne({userLogin:username}).exec(function (err, user) {
      if (err) res.customError('508', sails.config.errs.systemError('数据库错误'));

      if (user) {
        bcrypt.compare(password, user.password, function (err, match) {
          if (err) res.customError('508', sails.config.errs.systemError());

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
                res.customError('508', sails.config.errs.systemError('写入Token错误'));
                console.log(err);
              }
              //console.log(AccessToken);
            });
            res.set('token',token);

            /*
            //todo: remove following for production
            res.set('Access-Control-Allow-Origin', '*');
            res.set("Access-Control-Allow-Methods', 'POST, GET");
            res.set('Custom-Header', 'Own-Data');
            res.set('Access-Control-Expose-Headers', 'Custom-Header');
            // end of removing part
            */

            res.json(user);
          } else {
            // invalid password
            res.customError('508', sails.config.errs.login_password_wrong);
          }
        });
      } else {
        res.customError('508', sails.config.errs.login_username_notfound);
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
      if (!email) return res.serverError(sails.config.errs.param_email_notfound);
      UtilsService.checkEmail(email, function(err, found){
        if (err) return res.serverError("系统错误");
        if (!found) return res.customError('508',sails.config.errs.user_email_notfound);

        var code = UtilsService.encrypt(email);
        var port = "";
        //if (req.port) port = ":" + req.port;

        var url = 'https://' + req.host + port + '/#/access/resetpwd?code=' + code;

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

      });


    },

    resetPassword: function (req, res) {

      if (req.method.toUpperCase()=='GET') {
        res.view('forgotpw');
      } else {
        var thecode = req.param('thecode');
        var email = req.param('email');
        if (!email) return res.customError('508', sails.config.errs.user_email_notfound);

        UtilsService.checkEmail(email, function(err, found) {
          if (err) return res.serverError("系统错误");
          if (!found) return res.customError('508', sails.config.errs.user_email_notfound);
          var bcrypt = require('bcrypt');
          bcrypt.compare(email, thecode, function (err, match) {
            if (err) return res.serverError("系统错误");
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
                  if (err) return res.serverError("重置密码错误");
                } else {
                  console.log(userData);
                }
                res.ok();
              });
            } else {
              console.log('no match');
              return res.serverError("重置密码错误");
            }
          });
        });
      }
    }
};

