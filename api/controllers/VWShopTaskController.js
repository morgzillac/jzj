/**
 * VWShopTaskController
 *
 * @description :: Server-side logic for managing Vwshoptasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var util = require('util'),
  actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');

module.exports = {
// read only model, edit through Trans controller
  create: function (req, res) {

    console.log("not allowed");
    res.forbidden();
  },

  update: function (req, res) {

    console.log("not allowed");
    res.forbidden();
  },

  destroy: function (req, res) {

    console.log("not allowed");
    res.forbidden();
  },


 pending: function (req, res) {

   var userId = 9999;

   // get user ID of the current logged in user
   if (req.userData && req.userData.userId) {
     userId = req.userData.userId;
   }
   var criteria = actionUtil.parseCriteria(req);

   criteria.pending = { '>': 0 };
   criteria.userId = userId;
   var query = VWShopTask.find()
     .where(criteria)
     .limit(actionUtil.parseLimit(req))
     .skip(actionUtil.parseSkip(req))
     .sort(actionUtil.parseSort(req));

   sails.log.info("criteria = " + JSON.stringify(criteria));

   query.exec(function(err, results) {
    if (err) res.customError('508', sails.config.errs.systemError('数据库错误'));

    if (results) {
      res.json(results);
//        res.jsonx(results);
    } else {
      sails.log.error('VWShopTaskController', sails.config.errs.db_userdata_not_found);
      res.customError('508', sails.config.errs.db_userdata_not_found);
    }
  });

},

  assigned: function (req, res) {
    var userId = 9999;
    // get user ID of the current logged in user
    if (req.userData && req.userData.userId) {
      userId = req.userData.userId;
    }

    var criteria = actionUtil.parseCriteria(req);
    criteria.userId = userId;
    criteria.pending = { '>': 0 };
    var query = VWShopTask.find()
      .where(criteria)
      .limit(actionUtil.parseLimit(req))
      .skip(actionUtil.parseSkip(req))
      .sort(actionUtil.parseSort(req));

    sails.log.info("criteria = " + JSON.stringify(criteria));
    criteria.where.pending = { '>': 0 };
    var query = VWShopTask.find()
      .where(criteria.where)
      .limit(actionUtil.parseLimit(req))
      .skip(actionUtil.parseSkip(req))
      .sort(actionUtil.parseSort(req));

    sails.log.info("criteria = " + JSON.stringify(criteria));
    query.exec(function (err, results) {
      if (err) res.customError('508', sails.config.errs.systemError('数据库错误'));

      if (results) {
        res.json(results);
//        res.jsonx(results);
      } else {
        sails.log.error('VWShopTaskController', sails.config.errs.db_userdata_not_found);
        res.customError('508', sails.config.errs.db_userdata_not_found);
      }
    });
  },

  getTaskForBuyer: function (req, res) {

    var criteria = actionUtil.parseCriteria(req);
    var limit =  actionUtil.parseLimit(req);

    var query = VWShopTask.find()
        .where(criteria)
        .limit(limit)
      ;

    query.exec(function (err, task) {
      if (err) return res.customError('508', sails.config.errs.systemError('硬盘数据出错'));
      if (task) {
        res.json(task);
      } else {
        res.customError('403', sails.config.errs.access_notloggedin);
      }
    });
  }

};

