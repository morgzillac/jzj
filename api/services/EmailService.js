// EmailService.js - in api/services
module.exports = {

  sendMail: function(opts) {

    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jzj@hyperbridge.com',
        pass: 'juzhuanjie'
      }
    });
    transporter.sendMail({
      from: 'jzj@hyperbridge.com',
      to: opts.to,
      subject: opts.subject,
      text: opts.text
    });

  }

};
