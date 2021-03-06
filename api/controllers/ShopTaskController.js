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

  update: function (req, res) {
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
      taskObj.productCount = taskObj.taskDetail.productCount;

      sails.log.info(taskObj.taskId, taskObj.keywords);
    } catch (e) {
      sails.log.error(e);
    }

    ShopTask.create(taskObj).exec(sails.log);

    res.ok();
  },

  canTakeTask: function (req, res) {
    // todo: needs reword
    var taskId = req.param('taskId');
    if (!taskId) return res.ok({result:fasle});
     UtilsService.canTakeTask(taskId, function (err, result){
       if (err) res.customError('508', sails.config.errs.systemError());
       return res.ok({result:result});
     });
  }
};

