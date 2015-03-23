/**
 * TaskBuyerController
 *
 * @description :: Server-side logic for managing taskbuyers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var util = require('util'),
    actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');

module.exports = {


  create: function (req, res) {
    var ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ModelService.create(req, res, TaskBuyer,{ipAddress:ipAddress});
  },

  update: function (req, res) {
    ModelService.update(req, res, TaskBuyer, {});
  },


  list: function (req, res) {
    var query = TaskBuyer.find({select:['taskBuyerId','userId', 'taskId','statusId','createdAt']})
      .where( actionUtil.parseCriteria(req) )
      .limit( actionUtil.parseLimit(req) )
      .skip( actionUtil.parseSkip(req) )
      .sort( actionUtil.parseSort(req) );

    query.exec(function(err, results) {
      if (err) res.customError('508', sails.config.errs.systemError('数据库错误'));

      if (results) {
        res.json(results);
//        res.jsonx(results);
      } else {
        sails.log.error('TasKbuyerController', sails.config.errs.db_userdata_not_found);
        res.customError('508', sails.config.errs.db_userdata_not_found);
      }
    });

  }

};

