/**
 * UserMembershipController
 *
 * @description :: Server-side logic for managing Usermemberships
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  create: function (req, res) {
    ModelService.create(req, res, UserMembership,{});

  },

  update1: function (req, res) {
    ModelService.update(req, res, UserMembership,{});
  }

};

