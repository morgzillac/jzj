/**
 * BuyerAccountController
 *
 * @description :: Server-side logic for managing Buyeraccounts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function (req, res) {
    ModelService.create(req, res, BuyerAccount,{});

  },

  update: function (req, res) {
    ModelService.update(req, res, BuyerAccount,{});
  },

  checkAccount: function (req,res) {
    var accountLogin = req.param('accountLogin');
    var platformId = req.param('platformId');
    var find = BuyerAccount.find({accountLogin:accountLogin,platformId:platformId});
    find.exec(function (err, ret) {
      if (err) res.serverError('数据库错误');
      if (ret.length>0) {
        res.ok({result:true});
      }else {
        res.ok({result:false});
      }
    })

  },

  checkWW: function(req, res) {
    var wangwang = req.param('wangwang');
    var find = BuyerAccount.find({wangwang:wangwang});
    find.exec(function (err, ret) {
      if (err) res.serverError('数据库错误');
      if (ret.length>0) {
        res.ok({result:true});
      }else {
        res.ok({result:false});
      }
    })
  }
};

