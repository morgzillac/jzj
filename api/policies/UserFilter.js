/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Add user to query Criteria
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */


module.exports = function(req, res, next) {

  if (req.userData &&  req.userData.userId) {
    // Use existing req.options.where, or initialize it to an empty object
    req.options.where = req.options.where || {};

    // Set the default `userId` for "find" and "update" blueprints
    req.options.where.userId = req.userData.userId;
    return next();
  } else {
    return res.customError('403', sails.config.errs.access_notloggedin);
  }

/*

  if (req.param('where')) {
     var where = JSON.parse(req.param('where'));
    if (req.userData && where.userId == req.userData.userId) {
      return next();
    }
  }
  return res.customError('403', sails.config.errs.access_notTheUser);
  */

};
