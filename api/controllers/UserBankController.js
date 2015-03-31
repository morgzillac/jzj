/**
 * UserBankController
 *
 * @description :: Server-side logic for managing userbanks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var blueprintCreate = require("../../node_modules/sails/lib/hooks/blueprints/actions/create");

module.exports = {

  create: function (req, res) {
    ModelService.create(req, res, UserBank,{});

  },

  update1: function (req, res) {
    ModelService.update(req, res, UserBank,{});
  }

};

