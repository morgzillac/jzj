/**
 * Points2cashController
 *
 * @description :: Server-side logic for managing points2cashes
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
  }
};

