/**
* tPointsTransaction.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  migrate: 'alter',
  "attributes": {
    "transactId": {
      "columnName": "transact_id",
      autoIncrement: true,
      "type": "integer",
      "primaryKey": true
    },
    "userId": {
      "columnName": "user_id",
      "type": "integer"
    },
    "cashIn": {
      "columnName": "cash_in",
      "type": "integer",
      "defaultsTo": "0"
    },
    "cashOut": {
      "columnName": "cash_out",
      "type": "integer",
      "defaultsTo": "0"
    },
    "pointsIn": {
      "columnName": "points_in",
      "type": "integer",
      "defaultsTo": "0"
    },
    "pointsOut": {
      "columnName": "points_out",
      "type": "integer",
      "defaultsTo": "0"
    },
    "pointsBalance": {
      "columnName": "points_balance",
      "type": "integer",
      "defaultsTo": "0"
    },
    "cashBalance": {
      "columnName": "cash_balance",
      "type": "integer",
      "defaultsTo": "0"
    },
    "frozenBalance": {
      "columnName": "frozen_balance",
      "type": "integer",
      "defaultsTo": "0"
    },
    "typeId": {
      "columnName": "type_id",
      "type": "integer",
      "defaultsTo": "0"
    },
    "comment": {
      "columnName": "comment",
      "type": "string",
      "defaultsTo": "",
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
  "tableName": "t_transaction"
}
