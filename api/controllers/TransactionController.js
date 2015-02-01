/**
 * TransactionController
 *
 * @description :: Server-side logic for managing transactions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var json2csv = require('json2csv');
var moment = require('moment');

module.exports = {


  csv: function (req, res) {

    Transaction.query("select * from t_transaction", function(err, list){
      if (err) console.log(err);
      // Send a CSV response
      var config = {
        fields : ['transact_id','user_id', 'cash_in', 'cash_out', 'points_in',
            'points_out', 'points_balance', 'cash_balance', 'frozen_balance'],
        data: list
      };

      json2csv(config, function(err, csv) {
        if (err) console.log(err);
        var filename = "report-" + moment().format("YYYY-MM-DD") + ".csv";
        res.attachment(filename);
        res.end(csv, 'UTF-8');
      });

    });
  }
};

