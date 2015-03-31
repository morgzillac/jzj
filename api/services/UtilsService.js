module.exports = {

  /**
 * Return a unique identifier with the given `len`.
 *
 *     utils.uid(10);
 *     // => "FDaS435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */

  uid: function(len) {
    var buf = []
      , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      , charlen = chars.length;

    for (var i = 0; i < len; ++i) {
      buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
  },

  uidLight: function(len) {
    var buf = []
      , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      , charlen = chars.length;

    for (var i = 0; i < len; ++i) {
      buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
  },


/**
 * Execute a sql
 *
 * @param {String} sql
 * @param {Number} max
 * @return {Number}
 * @api private
 */

  executeSQL: function (model, sql) {
    model.query(sql, function (err,data) {
      // Error handling
      console.log(sql);
      if (err) {
        console.log(err);
        return false;
      }
      return true;

    });
  },

  encrypt: function (value) {
    var bcrypt = require('bcrypt');
    try{
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(value, salt);
    } catch (err) {
      console.log('UtilsService.encrypt' + err)
      throw (err);
    }
  },

  resetPasswordCode: function (email) {
    return this.encrypt(email);
  },

//
// this is a temp solution for updating the assigned and pending counts in ShopTask
  // it is called when TaskBuyer is created, destroyed and updated
  updateShopTaskCounts: function (taskId) {
    //update assigned count in ShopTask

      //todo: get rid of sql execution
      var sql = 'call sp_update_task_count(' + taskId + ')';

    //console.log (sql);
      ShopTask.query(sql, function (err, data) {
        if (err) {
          sails.log('更新任务表Assigned出错' + err);
          console.log(err);
        }
      });
  },


  checkEmail: function (email, callback) {

    User.findOne({email:email}).exec(function(err, results) {
      if (err) callback(err, false);
      if (results) {
        callback(false, true);
      } else {
        callback(false, false);
      }
    });
  },

  checkLogin: function (login, callback) {

    User.findOne({userLogin:login}).exec(function(err, results) {
      if (err) callback(err, false);
      if (results) {
        callback(false, true);
      } else {
        callback(false, false);
      }
    });
  },

  canTakeTask: function (taskId, cb) {
      var query = ShopTask.findOne({taskId:taskId, select:['assigned','totalTasks']});
      query.exec(function(err, result) {
        if (err) cb(err);
        if (result) {
          cb (null, result.assigned < result.totalTasks);
        }else{
          cb (null, false);
        }
      });

  }

};





/**
 * Return a random int, used by `UtilsService.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

