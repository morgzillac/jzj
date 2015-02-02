/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  var tokenIn = req.get('token');

  AccessToken.findOne({token:tokenIn}).exec(function (err, userData) {
    if (err) return res.customError('500', sails.config.errs.systemError('硬盘数据出错'));
    if (userData) {
      req.userData = userData;
      AccessToken.update({token:tokenIn},{updatedAt:new Date()}).exec(function cb (err, updated){
        if (err) sails.log.error(err);

        console.log('IsLoggedIn.js token:' + tokenIn + updated[0].updatedAt);
      })
      next();
    } else {
      return res.customError('403', sails.config.errs.access_notloggedin);
    }
  })

};
