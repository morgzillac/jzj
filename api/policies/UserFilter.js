/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Add user to query Criteria
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */


module.exports = function(req, res, next) {

  if (req.param('where')) {
     var where = JSON.parse(req.param('where'));
    if (where.userId == req.userId) return next();
  }

  return res.customError('403', sails.config.errs.access_notTheUser);

};
