/**
 * ShopTaskController
 *
 * @description :: Server-side logic for managing shoptasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res) {

    ModelService.create(req, res, ShopTask,{});

  },

  update1: function (req, res) {
    ModelService.update(req, res, ShopTask,{});
  },

  publish: function (req, res) {
    var taskJson = req.param('taskJson');
    sails.log.info(taskJson);
    try {
      var taskObj = JSON.parse(taskJson);
      taskObj.keywords = taskObj.taskDetail.searchProductKeywords;
      taskObj.taskDetail = JSON.stringify(taskObj.taskDetail);
      taskObj.userId = req.userData.userId; //set user ID
      sails.log.info(taskObj.taskId, taskObj.keywords);
    } catch (e) {
      sails.log.error(e);
    }

    ShopTask.create(taskObj).exec(sails.log);

    res.ok();
  }

};

