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


    AccessToken.findOne({userId:req.userData.userId}).exec(function (err, token) {
      if (err) return res.customError('500', sails.config.errs.systemError('硬盘数据出错'));

      if (token) {
        bcrypt.compare(payPassword, token.payPassword, function (err, match) {
          if (err) {
            console.log(err);
            res.customError('500', sails.config.errs.systemError());
          } else {
            res.json(match);
          }
        });
      } else {
        res.customError('403', sails.config.errs.access_notloggedin);
      }
    });
  }
};

