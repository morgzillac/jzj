/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var util = require('util'),
  actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');

module.exports = {

    balance: function (req, res){
      var userId = 0;

      // get user ID of the current logged in user
      if (req.userData.userId && req.userData.userId) userId = req.userData.userId;

      UserBalance.findOne({userId:userId}).exec(function (err, bal) {
        if (err) res.customError('500', sails.config.errs.systemError('数据库错误'));

        if (bal) {
              res.json(bal);
        } else {
          res.customError('500', sails.config.errs.db_userdata_not_found);
        }

      })
    },

    count: function (req, res){
      var strMode = req.param('model');
      var count = 0;
      var  criteria = actionUtil.parseCriteria(req);

      // remove the model attribute from query string
      delete criteria.model;

      // add user Id to the criteria
      criteria.where = criteria.where || {};

      if (req.userData) {
        criteria.where.userId = req.userData.userId;
      } else {
        // send not logged in msg
        return res.customError('403', sails.config.errs.access_notloggedin);
      }

      switch (strMode) {
        case 'transaction' :
            Transaction.count(criteria)
            .exec(function(err, total){
              if (err) return res.serverError(err);
                res.ok({count: total})});
              break;
        case 'cashout':
          Cashout.count(criteria)
            .exec(function(err, total) {
              if (err) return res.serverError(err);
              res.ok({count: total})});
          break;
        case 'recharge':
          Recharge.count(criteria)
            .exec(function(err, total){
              if (err) return res.serverError(err);
              res.ok({count: total})
            });
          break;
        case 'points2cash':
          Points2Cash.count(criteria)
            .exec(function(err, total){
              if (err) return res.serverError(err);
              res.ok({count: total})});
          break;
        case 'task':
          VWShopTask.count(criteria)
            .exec(function(err, total){
              if (err) return res.serverError(err);
              res.ok({count: total})});

          break;
        default:
          res.ok({count: count});
      }
    }

};

