/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  gitpull: function(req, res) {

    var exec = require('child_process').exec;
    function puts(error, stdout, stderr) {
      console.log(stdout);
      res.ok(stdout);
    }
    exec(" rm logs/*", puts);
    exec("git pull", puts);
  },

  "isLoggedIn": function(req,res){
      res.ok('passed');
  },

   "error": function(req,res) {
     var status = req.param('status');
     var errorcode = req.param('errorcode');
     var data = {
       code: 'error_code_not_found',
       message: 'The error code passed in querystring was not defined on the server side.'
     }

     if (errorcode && sails.config.errs[errorcode]) {
       data = sails.config.errs[errorcode];
     }
     if (!status) status = 0;

     switch (status) {
       case '500':
         res.serverError(data);
         break;
       case '400':
         res.badRequest(data);
         break;
       case '404':
         res.badRequest(data);
         break;
       default:
         console.log(status + ':' + data);
         res.customError(status, data);
     }

   },

      req: function (req, res){

        console.log('req.ips: '  + req.ips + '\n');
        console.log('req.ip: '  + req.ip + '\n');
        console.log('req.ips: '  + req.host + '\n');
        res.ok();
      },

    email: function(req,res){
      EmailService.sendMail({
        to:'mcheng@hyperbridge.com',
        subject: 'test',
        text:'this is a test'
      });
      res.ok();

    },

  log: function(req,res){
    sails.log('just a regular log');
    sails.log.error('this is an error');
    console.log("here");
    sails.log.info('this is an info');

    sails.config.transLogger.info ('transaction');
    sails.config.transLogger.error ('transaction error');
    //logTrans.info('transaction info');
    //logTrans.error('transaction error');

    res.ok();

  },

  query: function (req, res){
      User.query("select * from t_user_address", function(err, result){
          if (err) return res.serverError(err);

         return res.json(result);


      })


    }

};

