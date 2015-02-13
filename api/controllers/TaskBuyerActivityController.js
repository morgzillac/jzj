/**
 * TaskBuyerActivityController
 *
 * @description :: Server-side logic for managing Taskbuyeractivities
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function (req, res) {
    var ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ModelService.create(req, res, TaskBuyerActivity,{ipAddress:ipAddress});
  },

  update: function (req, res) {
    ModelService.update(req, res, TaskBuyerActivity, {});
  }

};

