var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,
	"tableName": "t_user",
//  migrate: 'alter',
  "attributes": {
    "userId": {
      "columnName": "user_id",
      "type": "integer",
       autoIncrement: true,
     "primaryKey": true
    },
    "userTypeId": {
      "columnName": "user_type_id",
      index: true,
      "type": "integer"
    },
     "image": {
      "columnName": "image",
      "type": "string",
      "size": 145
    },
     "password": {
       "type": "string",
       "size": 500
     },
    "payPassword": {
      "columnName": "pay_password",
      "type": "string",
      "size": 500
    },
    "mobile": {
      "type": "string",
      index: true,
      "size": 45
    },
    "email": {
      index: true,
      "type": "email",
      unique: true
    },
    "qq": {
      "type": "string",
      "size": 45
    },
    "wechat": {
      "type": "string",
      "size": 45
    },

    "deleted": {
      "type": "boolean",
      "default": false
    },
    "createdAt": {
      "columnName": "created_at",
      "type": "datetime"
    },
    "createdBy": {
      "columnName": "created_by",
      "type": "string",
      "size": 45
    },
    "updatedAt": {
      "columnName": "updated_at",
      "type": "datetime"
    },
    "updatedBy": {
      "columnName": "updated_by",
      "type": "string",
      "size": 45
    },

    "banks":{
      collection:'UserBank',
      via: 'userId'
    },

    userLogin  : {
     "columnName": "user_login",
      "type": "string",
      "size": 45,
      unique: true
    },

    // Override toJSON method to remove password from API
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.payPassword;
      return obj;
    }


  },

  beforeCreate4: function (attrs, next) {
    var bcrypt = require('bcrypt');
    async.series([
        function(callback){
          bcrypt.genSalt(10);
          callback(null, salt);
        },
        function(callback){
          bcrypt.genSalt(10);
          callback(null, salt);
        }
      ],

      function(err, results){
        async.series([
            function(callback){
              bcrypt.hash(attrs.password, results[0]),
              callback(null, hash);
            },
            function(callback){
              bcrypt.hash(attrs.payPassword, results[1]),
              callback(null, hash);
            }
          ],
          function(err, results){
            attrs.password = results[0];
            attrs.payPassword = results[1];
          });
      });

  },

  beforeCreate3: function (attrs, next) {
    var bcrypt = require('bcrypt');
    var Promise = require('q');

    Promise.all([
      bcrypt.genSalt(10),
      bcrypt.genSalt(10)
    ])
      .spread(function(salt1, salt2){
        Promise.all([
          bcrypt.hash(attrs.password, salt),
          bcrypt.hash(attrs.payPassword, salt)
        ])
          .spread(function(salt1, salt2){
            //use the results
            next();
          })
          .catch(function(err1, err2){
            //handle errors
            next(err1);
          })
          .done(function(){
            //clean up
          });
      })
      .catch(function(err1, err2){
         next(err1);
      })
      .done(function(){
        //clean up
      });
  },

    beforeCreate1: function (attrs, next) {
    var bcrypt = require('bcrypt');

    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(attrs.password, salt, function(err, hash) {
        if (err) return next(err);
        attrs.password = hash;
        console.log(hash);

        bcrypt.genSalt(10, function(err, salt) {
          if (err) return next(err);
          bcrypt.hash(attrs.payPassword, salt, function(err, hash) {
            if (err) return next(err);

            attrs.payPassword = hash;
            console.log(hash);
            next();
          });
        });
      });
    });

    },

  beforeCreate: function (attrs, next) {

    try {
      delete attrs.userId;

      attrs.password = UtilsService.encrypt(attrs.password);
      attrs.payPassword = UtilsService.encrypt(attrs.payPassword);
    } catch (err) {
      return next (err);
    }
    next();
  },

  beforeUpdate: function (attrs, next) {
    try {
      delete attrs.userId;

      if (attrs.password) attrs.password = UtilsService.encrypt(attrs.password);
      if (attrs.payPassword) attrs.payPassword = UtilsService.encrypt(attrs.payPassword);
    } catch (err) {
      return next (err);
    }
    next();
  }

  };

module.exports = User;
