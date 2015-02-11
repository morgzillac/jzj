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
  }


};

