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

/*see the documentation for Winston:  https://github.com/flatiron/winston */
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)( { } ),
    new (winston.transports.File)({
      filename: 'logs/logfile.log',
      level: 'verbose',
      json : false,
      colorize : false
    })
  ]
});

/*
var transLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)( { } ),
    new (winston.transports.File)({ filename: 'trans.log',
      level: 'verbose',
      json : false,
      colorize : false
    })
  ]
});
*/
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
    level: 'info',
    filePath: 'logs/jzj.log',
    custom: logger
  }

};
