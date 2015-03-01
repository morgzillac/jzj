// EmailService.js - in api/services
module.exports = {

  sendMail: function(opts) {

    sails.hooks.email.send(template, data, opts, function(){

    });

    /*

  */
  },

  sendEmail4: function (opts) {
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'QQ',
      auth: {
        user: 'morgan@saimonet.com',
        pass: 'mc8saimo'
      }
    });
    transporter.sendMail({
      from: 'morgan@saimonet.com',
      to: opts.to,
      subject: opts.subject,
      text: opts.text
    });

  },

  sendEmail: function (locals) {


     var path           = require('path');
    var templatesDir   = path.resolve(__dirname, sails.config.email.transport.templateDir);

    var emailTemplates = require('email-templates')
      , nodemailer     = require('nodemailer');

    console.log(templatesDir);
    emailTemplates(templatesDir, function(err, template) {

      if (err) {
        console.log(err);
      } else {

        // ## Send a single email

        // Prepare nodemailer transport object
        var transporter = nodemailer.createTransport(
          sails.config.email.transport);


        // Send a single email
        template(locals.templateName, locals, function(err, html, text) {
          if (err) {
            console.log(err);
          } else {
            transporter.sendMail({
              from: '聚赚届 <master@juzhuanjie.com>',
              to: locals.to,
              subject: locals.subject,
              html: html
              // generateTextFromHTML: true,
              // text: text
            }, function(err, responseStatus) {
              if (err) {
                console.log(err);
              } else {
                console.log('after sending email');
                //console.log(responseStatus.message);
              }
            });
          }
        });


      }
    });
  }

};
