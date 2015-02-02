/**
 * ServiceController
 *
 * @description :: Server-side logic for managing services
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  checkPayPassword: function (req, res) {

    var payPassword = req.param('password');
    var bcrypt = require('bcrypt');


    User.findOne({userId:req.userData.userId}).exec(function (err, user) {
      if (err) return res.customError('500', sails.config.errs.systemError('硬盘数据出错'));

      if (user) {
        bcrypt.compare(payPassword, user.payPassword, function (err, match) {
          if (err) {
            res.customError('500', sails.config.errs.systemError());
          } else {
            res.json({result:match});
          }
        });
      } else {
        res.customError('403', sails.config.errs.access_notloggedin);
      }
    });
  },

  email: function (req, res) {

    // An example users object with formatted email function
    var locals = {
      templateName: sails.config.email.welcome.templateName,
      subject: sails.config.email.welcome.subject,
      to: req.param('email'),
      data: {
        first: 'Morgan',
        last: 'Cheng'
      }
    };

    EmailService.sendEmail(locals);

    res.ok();
  }
};

