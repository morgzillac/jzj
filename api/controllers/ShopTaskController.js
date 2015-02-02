/**
 * ShopTaskController
 *
 * @description :: Server-side logic for managing shoptasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  publish: function (req, res) {
    var taskJson = req.param('taskJson');
    console.log(taskJson);
    try {
      var taskObj = JSON.parse(taskJson);
      taskObj.keywords = taskObj.taskDetail.searchProductKeywords;
      taskObj.taskDetail = JSON.stringify(taskObj.taskDetail);
      taskObj.userId = req.userData.userId; //set user ID
      console.log(taskObj.taskId, taskObj.keywords);
    } catch (e) {
      console.log(e);
    }

    ShopTask.create(taskObj).exec(console.log);

    res.ok();
  }

};

