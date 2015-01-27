/**
 * TransController
 *
 * @description :: Server-side logic for managing Trans
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  recharge: function (req, res) {
    var comment = '"充值"';
    var userId = 9999;
    var isFrozen = false;

    // for testing only, to be removed.
    if (req.param('userId')){
      userId = req.param('userId');
    }


    if (req.param('isFrozen')) {
      isFrozen = true;
    }
    if (req.userId) userId = req.userId;
    var sql = "call sp_recharge(" + req.param('points') + ","
        + req.param('amount')  + ","
        + req.param('type')  + ","
      + '"' + req.param('bankType')  + '"' + ","
      + comment + ","
        + userId + ","
        + isFrozen + ","
      + " @result);";
    User.query(sql, function (err,data) {
      console.log(sql);
      // Error handling
      if (err) {
        console.log(err);
        res.customError("操作失败！");
      } else {
        if (data[0][0].outSuccess == 1) {
          console.log("充值成功！", data);
          res.ok("充值成功！");
        }else {
          res.customError("操作失败！");
        }
      }
    });
  },

  cashout: function (req, res) {
    var comment = '"提现"';
    var userId = 9999;

    // for testing only, to be removed.
    if (req.param('userId')){
      userId = req.param('userId');
    }


    if (req.userId) userId = req.userId;
    var sql = "call sp_cashout("
      + req.param('points') + ","
      + req.param('amount')  + ","
      + req.param('fee')  + ","
      + req.param('type')  + ","
      + req.param('userBankId')  + ","
      + comment + ","
      + userId + ","
      + " @result);";
    User.query(sql, function (err,data) {
      // Error handling
      console.log(sql);
      if (err) {
        console.log(err);
        res.customError("操作失败！");
      } else {
        if (data[0][0].outSuccess == 1) {
          console.log("提现成功！", data);
          res.ok("提现成功！");
        }else{
          res.customError("操作失败！");
        }
      }
    });
  },

  points2cash: function (req, res) {
    var userId = 9999;
    var comment = '"变现"';

    // for testing only, to be removed.
    if (req.param('userId')){
      userId = req.param('userId');
    }


    if (req.userId) userId = req.userId;
    var sql = "call sp_points2cash("
      + req.param('points') + ","
      + req.param('amount')  + ","
      + req.param('fee')  + ","
      + comment + ","
      + userId + ","
      + " @result);";

    Transaction.query(sql, function (err,data) {
      // Error handling
      console.log(sql);
      if (err) {
        console.log(err);
        res.customError("操作失败！");
      } else {
        if (data[0][0].outSuccess == 1) {
          console.log("变现成功！", data);
          res.ok("变现成功！");
        }else{
          res.customError("操作失败！");
        }
      }

    });

    /*
     if (UtilsService.executeSQL(Transaction, sql)) {
       res.ok();
     } else {
       res.customError("操作失败！");
     }
     */

  },

  publishTask: function (req, res) {
    var taskJson = req.param('taskJson');
    console.log(taskJson);
    try {
      var taskObj = JSON.parse(taskJson);
     taskObj.keywords = taskObj.taskDetail.searchProductKeywords;
      taskObj.taskDetail = JSON.stringify(taskObj.taskDetail);
      console.log(taskObj.taskId, taskObj.keywords);
    } catch (e) {
      console.log(e);
    }

    ShopTask.create(taskObj).exec(console.log);

    res.ok();
  },

  calcCost: function (req, res) {
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

