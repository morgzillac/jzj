/**
 * TransController
 *
 * @description :: Server-side logic for managing Trans
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  recharge: function (req, res) {
    var userId = 9999;
    var isFrozen = false;
    var comment = '"充值现金"';

    if (req.param('isFrozen') && req.param('isFrozen') == 1) {
      isFrozen = true;
      comment = '"充值押金"';
    } else if (req.param('points') && req.param('points') > 0) {
      comment = '"购买赚点"';
    }

    // get user ID of the current logged in user
    if (req.userData && req.userData.userId) userId = req.userData.userId;

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
        res.customError('508',comment + "失败！");
      } else {
        if (data[0][0].outSuccess == 1) {
          console.log(comment, data);
          res.ok(comment + "成功！");
        }else {
          res.customError('508',comment + "失败！");
        }
      }
    });
  },

  cashout: function (req, res) {
    var comment = '"提现"';
    var userId = 9999;

    // get user ID of the current logged in user
    if (req.userData && req.userData.userId) {
      userId = req.userData.userId;
    } else {
      res.customError('403', sails.config.errs.access_notloggedin);
    }

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
        res.customError('508',"操作失败！");
      } else {
        if (data[0][0].outSuccess == 1) {
          console.log("提现成功！", data);
          res.ok("提现成功！");
        }else{
          res.customError('508',"操作失败！");
        }
      }
    });
  },

  points2cash: function (req, res) {
    var userId = 9999;
    var comment = '"变现"';

    // get user ID of the current logged in user
    if (req.userData && req.userData.userId) {
      userId = req.userData.userId;
    } else {
      res.customError('403', sails.config.errs.access_notloggedin);
    }

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
        res.customError('508',"操作失败！");
      } else {
        if (data[0][0].outSuccess == 1) {
          console.log("变现成功！", data);
          res.ok("变现成功！");
        }else{
          res.customError('508',"操作失败！");
        }
      }

    });

  },

  calcCost: function (req, res) {
    var taskJson = req.param('taskJson');
    try {
      var taskObj = JSON.parse(taskJson);
      taskObj = taskObj.taskDetail;
     // console.log(taskObj);
    } catch (e) {
      console.log(e);
    }

    var result = {};
    var categories = [{}, {}, {}];

    result.categories = categories;
    result.total = 0;
    result.totalPts = 0;
    categories[0].name = "deposit";
    categories[0].items = [];
    categories[0].subtotal = 0;

    categories[1].name = "service";
    categories[1].items = [];
    categories[1].subtotal = 0;

    categories[2].name = "extra";
    categories[2].items = [];
    categories[2].subtotal = 0;

    var item = {};
    item.name = "商品总价 (" + taskObj.productPrice + " X "
       + taskObj.productCount + " X "
       + taskObj.totalTasks+ ')';
    item.value = taskObj.productPrice * taskObj.productCount * taskObj.totalTasks;
    result.total += item.value;
    categories[0].subtotal += item.value;
    categories[0].items.push(item);

    var item = {};
    item.name = "平台服务费 (" + taskObj.productPrice * sails.config.settings.fee.platform
            + " X " +  taskObj.totalTasks + ")";
    item.value = taskObj.productPrice * sails.config.settings.fee.platform
            *  taskObj.totalTasks;
    result.totalPts += item.value;
    categories[1].subtotal += item.value;
    categories[1].items.push(item);

    var item = {};
    item.name = "服务费 (" + taskObj.productPrice * sails.config.settings.fee.shopper
          + " X " +  taskObj.totalTasks + ")";
    item.value =  taskObj.productPrice * sails.config.settings.fee.shopper * taskObj.totalTasks;
    result.totalPts += item.value;
    categories[1].subtotal += item.value;
    categories[1].items.push(item);

    if (taskObj.agreeApprovalPriority) {
      var item = {};
      item.name = "加速审核费";
      item.value = sails.config.settings.fee.approvalPriority;
      categories[2].items.push(item);
      categories[2].subtotal += item.value;
      result.totalPts += item.value;
    }

    if (taskObj.includeShipping) {
      var item = {};
      item.name = "包邮费用 (" + sails.config.settings.fee.shipping
            + " X " +  taskObj.totalTasks + ")";
      item.value = sails.config.settings.fee.shipping;
      categories[2].items.push(item);
      categories[2].subtotal += item.value;
      result.totalPts += item.value;
    }



    //console.log(JSON.stringify(result));

    res.ok(result);
  }


};

