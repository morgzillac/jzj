/**
 * Logger configuration
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#documentation
 */

var winston = require('winston');

//see the documentation for Winston:  https://github.com/flatiron/winston

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)( { } ),
    new (winston.transports.DailyRotateFile)({
      name:'error-file',
      filename: 'logs/jzj_error.log',
      level: 'error',
      json : false,
      colorize : false
    }),
    new (winston.transports.DailyRotateFile)({
      name:'error-warn',
      filename: 'logs/jzj_warn.log',
      level: 'warn',
      json : false,
      colorize : false
    }),
    new (winston.transports.DailyRotateFile)({
      name:'debug-file',
      filename: 'logs/jzj_debug.log',
      level: 'debug',
      json : false,
      colorize : false
    }),
    new (winston.transports.DailyRotateFile)({
      name:'info_file',
      filename: 'logs/jzj_info.log',
      level: 'info',
      json : false,
      colorize : false
    })

  ]
});


module.exports = {

// Valid `level` configs:
  // i.e. the minimum log level to capture with sails.log.*()
  //
  // 'error'	: Display calls to `.error()`
  // 'warn'	: Display calls from `.error()` to `.warn()`
  // 'debug'	: Display calls from `.error()`, `.warn()` to `.debug()`
  // 'info'	: Display calls from `.error()`, `.warn()`, `.debug()` to `.info()`
  // 'verbose': Display calls from `.error()`, `.warn()`, `.debug()`, `.info()` to `.verbose()`
  //
  log: {
//    level: 'info',
//    filePath: 'logs/jzj.log',
    custom: logger
  },

  transLogger: new (winston.Logger)({
    transports: [
      new (winston.transports.Console)( { } ),
      new (winston.transports.DailyRotateFile)({
        filename: 'logs/jzj_trans.log',
        level: 'verbose',
        json : false,
        colorize : false
      })
    ]
  })

};

/*
module.exports.log = {
  colors: false,  // To get clean logs without prefixes or color codings
// filePath: 'logs/jzj.log',
  custom: logger
};
*/
