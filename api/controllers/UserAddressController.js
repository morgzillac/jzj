/**
 * UserAddressController
 *
 * @description :: Server-side logic for managing Useraddresses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function (req, res) {
    ModelService.create(req, res, UserAddress,{});

  },

  update: function (req, res) {
    ModelService.update(req, res, UserAddress,{});
  }

};

