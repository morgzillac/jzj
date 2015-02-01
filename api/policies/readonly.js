/**
 * Created by mcheng on 2/1/15.
 */
module.exports = function (req, res, next) {
 // console.log('in readonly policy');
  return res.forbidden();

}
