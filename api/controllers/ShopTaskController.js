/**
 * ShopTaskController
 *
 * @description :: Server-side logic for managing shoptasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {




  beforeCreate: function (req, res) {
    var taskJson = req.param('taskJson');
    console.log(taskJson);
    try {
      var taskObj = JSON.parse(taskJson).taskDetail;
      console.log(taskObj.taskId);
    } catch (e) {
      console.log(e);
    }

    res.ok();
  }

};

