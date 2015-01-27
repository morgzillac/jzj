/**
* tRecharge.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  migrate: 'drop',
  "attributes": {
    "rechargeId": {
      "columnName": "recharge_id",
      autoIncrement: true,
      "type": "integer",
      "primaryKey": true
    },
    "userId": {
      "columnName": "user_id",
      "type": "integer"
    },
    "amount": {
      "type": "integer"
    },
    "points": {
      "type": "integer"
    },
    "rechargeTypeId": {
      "columnName": "recharge_type_id",
      "type": "integer"
    },
    "bankType": {
      "columnName": "bank_type",
      "type": "string"
    },
    "bankConfirm": {
      "columnName": "bank_confirm",
      "type": "string"
    },
    "comment": {
      "columnName": "comment",
      "type": "string",
      "size": 500
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
  "tableName": "t_recharge"
}
