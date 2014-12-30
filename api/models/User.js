var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,
	"tableName": "t_user",
  migrate: 'safe',
  "attributes": {
    "userId": {
      "columnName": "user_id",
      "type": "integer",
       autoIncrement: true,
     "primaryKey": true
    },
    "userTypeId": {
      "columnName": "user_type_id",
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
      "size": 45
    },
    "mobile": {
      "type": "string",
      "size": 45
    },
    "email": {
      "type": "email", unique: true
    },
    "qq": {
      "type": "string",
      "size": 45
    },
    "wechat": {
      "type": "string",
      "size": 45
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
    }

  },

    beforeCreate: function (attrs, next) {
    var bcrypt = require('bcrypt');

    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(attrs.password, salt, function(err, hash) {
        if (err) return next(err);

        attrs.password = hash;
        console.log(hash);
        next();
      });
    });

  }

};

module.exports = User;
