/**
 * Created by mcheng on 2/11/15.
 */
function extend(target) {
  var sources = [].slice.call(arguments, 1);
  sources.forEach(function (source) {
    for (var prop in source) {
      target[prop] = source[prop];
    }
  });
  return target;
}

module.exports = {

  create: function(req, res, model, ext) {
    var data = req.params.all();
    if (!data){
      res.serverError('数据错误');
    }
    data = extend({},data,ext);
    data.userId = req.userData.userId;
    model.create(data)
      .exec(function createCB(err, result) {
        if (err) {
          res.customError('500', sails.config.errs.systemError('写入数据库错误'));
          console.log(err);
        } else {
          res.ok(result.toJSON());
        }
      });
  },

  update: function(req, res, model, ext){

    var data = req.params.all();
    if (!data){
      res.serverError('数据错误');
    } else if (data.userId && data.userId != req.userData.userId){
      res.customError('500', sails.config.errs.access_notTheUser);
    }
    extend(data,ext);
    model.update({userId:req.userData.userId},data)
      .exec(function createCB(err, result) {
        if (err) {
          res.customError('500', sails.config.errs.systemError('写入数据库错误'));
          console.log(err);
        } else {
          res.ok(result[0].toJSON());
        }
      });
  }


}
