/**
 * UserBalanceController
 *
 * @description :: Server-side logic for managing Userbalances
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  // read only model, edit through Trans controller
  create: function (req, res) {
    console.log("not allowed");
    res.forbidden();
  },

  update: function (req, res) {
    console.log("not allowed");
    res.forbidden();
  },

  destroy: function (req, res) {
    console.log("not allowed");
    res.forbidden();
  },

  find: function (req, res) {
    console.log("not allowed");
    res.forbidden();

  },

  findOne: function (req, res) {
    console.log("not allowed");
    res.forbidden();

  }

};

