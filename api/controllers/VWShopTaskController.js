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

   var criteria = actionUtil.parseCriteria(req);
   criteria.where = criteria.where || {};
   criteria.where.pending = { '>': 0 };;

   var query = VWShopTask.find()
    .where( criteria )
    .limit( actionUtil.parseLimit(req) )
    .skip( actionUtil.parseSkip(req) )
    .sort( actionUtil.parseSort(req) );

   query.exec(function(err, results) {
    if (err) res.customError('500', sails.config.errs.systemError('数据库错误'));

    if (results) {
      res.json(results);
//        res.jsonx(results);
    } else {
      res.customError('500', sails.config.errs.db_userdata_not_found);
    }
  });

},

  assigned: function (req, res) {
    var criteria = actionUtil.parseCriteria(req);
    criteria.where = criteria.where || {};
    criteria.where.pending = { '>': 0 };
    var query = VWShopTask.find()
      .where(criteria)
      .limit(actionUtil.parseLimit(req))
      .skip(actionUtil.parseSkip(req))
      .sort(actionUtil.parseSort(req));

    query.exec(function (err, results) {
      if (err) res.customError('500', sails.config.errs.systemError('数据库错误'));

      if (results) {
        res.json(results);
//        res.jsonx(results);
      } else {
        res.customError('500', sails.config.errs.db_userdata_not_found);
      }
    });
  }


  };

