/**
 * TransController
 *
 * @description :: Server-side logic for managing Trans
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  recharge: function (req, res) {
    var userId = 9999;
    if (req.userId) userId = req.userId;
    var sql = "call sp_recharge(" + req.param('points') + ","
        + req.param('amount')  + ","
        + req.param('type')  + ","
        + userId + ","
        + " @result);";
    User.query(sql, function (err,data) {
      // Error handling
      if (err) {

        console.log(sql);

        console.log(err);
      } else {
        console.log("充值成功！", data);
      }
      console.log(sql);
      res.ok();
    });
  },

  cashout: function (req, res) {
    var userId = 9999;
    if (req.userId) userId = req.userId;
    var sql = "call sp_cashout(" + req.param('points') + ","
      + req.param('amount')  + ","
      + req.param('fee')  + ","
      + req.param('type')  + ","
      + userId + ","
      + " @result);";
    User.query(sql, function (err,data) {
      // Error handling
      if (err) {

        console.log(sql);

        console.log(err);
      } else {
        console.log("提现成功！", data);
      }
      console.log(sql);
      res.ok();
    });
  },
  publishTask: function (req, res) {
    var taskJson = req.param('taskJson');
    console.log(taskJson);
    try {
      var taskObj = JSON.parse(taskJson);
      console.log(taskObj.a);
    } catch (e) {
      console.log(e);
    }
    res.ok();
  }

};

