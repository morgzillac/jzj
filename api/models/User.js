/**
* tUser.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "id": {
      "columnName": "user_id",
      "type": "integer",
       autoIncrement: true,
      "required": true,
     "primaryKey": true
    },
    "userTypeId": {
      "columnName": "user_type_id",
      "type": "integer"
    },
    "userLogin": {
      "columnName": "user_login",
      "type": "string",
      "size": 45
    },
    "password": {
      "type": "string",
      "size": 45
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
      "type": "string",
      "size": 45
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
    }

  },
 
  "tableName": "t_user",

  login: function (req, res) {
    var statusCode = 200;
    var result = {
      status: statusCode
    };  
    User.find({ userLogin: req.param('login'), 
            password: req.param('password') 
          })
          .populate('banks')
          .exec(function cb(err,user){
              if (err) return cb(err);
              console.log('We found 1'+ user);
              return res.json(user);
          });
    }

}