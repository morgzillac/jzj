/**
 * SellerShopController
 *
 * @description :: Server-side logic for managing sellershops
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  create: function (req, res) {
    ModelService.create(req, res, SellerShop,{});

  },

// read only model, edit through Trans controller
  update: function (req, res) {
    ModelService.update(req, res, SellerShop,{});
  }


};

