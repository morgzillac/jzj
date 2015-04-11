/**
* tCashout.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  migrate: 'alter',
  "attributes": {
    "cashoutId": {
      "columnName": "cashout_id",
      autoIncrement: true,
      "type": "integer",
      "primaryKey": true
    },
    "userId": {
      "columnName": "user_id",
      "type": "integer"
    },
    "amount": {
      "type": "integer",
      "defaultsTo": "0"
    },
    "points": {
      "type": "integer",
      "defaultsTo": "0"
    },
    "fee": {
      "type": "integer",
      "defaultsTo": "0"
    },
    "userBankId": {
      "model":"UserBank",
      "columnName": "user_bank_id",
      "type": "integer"
    },
    "comment": {
      "columnName": "comment",
      "type": "string",
      "size": 500
    },
    "cashoutTypeId": {
      "columnName": "cashout_type_id",
      "type": "integer"
    },
    "status": {
      "type": "integer"
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
    }
  },
  "tableName": "t_cashout"
}
