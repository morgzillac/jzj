/**
 * AutoTemplateController
 *
 * @description :: Server-side logic for managing Autotemplates
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  getAutoTemplate: function (req, res) {
    res.ok(sails.config.autoTemplates.tmall);

  }
}

