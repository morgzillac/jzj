/**
* tUserBank.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  migrate: 'safe',

  "attributes": {
    "userBankId": {
      "columnName": "user_bank_id",
       autoIncrement: true,
      "type": "integer",
      "primaryKey": true
    },
    "userId": {
      "model":"user",
      "columnName": "user_id",
      "type": "integer"
    },
    "bankType": {
      "columnName": "bank_type",
      "type": "string",
      "size": 45
    },
    "screenshot": {
      "columnName": "screenshot",
      "type": "string",
      "size": 145
    },
    "accountName": {
      "columnName": "account_name",
      "type": "string",
      "size": 45
    },
    "accountNumber": {
      "columnName": "account_number",
      "type": "string",
      "size": 45
    },
    "branch": {
      "type": "string",
      "size": 45
    },
    "city": {
      "type": "string",
      "size": 45
    },
    "comment": {
      "type": "string",
      "size": 2000
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

    beforeCreate: function (attrs, next) {

      if (req.userData && req.userData.userId) {
        attrs.userId = req.userData.userId;
        next();
      } else {
        return next(new Error('未登陆'));
      }
    },

    beforeUpdate: function (attrs, next) {
      if (req.userData && req.userData.userId) {
        attrs.userId = req.userData.userId;
        next();
      } else {
        return next(new Error('未登陆'));
      }
    }
  },


  "tableName": "t_user_bank"
}
