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

