/**
 * TransactionController
 *
 * @description :: Server-side logic for managing transactions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var util = require('util'),
  actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');

var json2csv = require('json2csv');
var moment = require('moment');

module.exports = {


  csv: function (req, res) {

    var query = Transaction.find()
      .where( actionUtil.parseCriteria(req) )
      .limit( actionUtil.parseLimit(req) )
      .skip( actionUtil.parseSkip(req) )
      .sort( actionUtil.parseSort(req) );

    query.exec (function(err, list){
      if (err) console.log(err);
      // Send a CSV response
      var config = {
        fields : ['transactId','userId', 'cashIn', 'cashOut', 'pointsIn',
            'pointsOut', 'pointsBalance', 'cashBalance', 'frozenBalance'],
        fieldNames: ['编号','用户编号','现金收入','现金支出','赚点收入','赚点支出','赚点余额','现金余额','押金余额'],
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

