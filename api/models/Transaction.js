/**
* tPointsTransaction.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
//  migrate: 'drop',
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
      "type": "integer"
    },
    "cashOut": {
      "columnName": "cash_out",
      "type": "integer"
    },
    "pointsIn": {
      "columnName": "points_in",
      "type": "integer"
    },
    "pointsOut": {
      "columnName": "points_out",
      "type": "integer"
    },
    "pointsBalance": {
      "columnName": "points_balance",
      "type": "integer"
    },
    "cashBalance": {
      "columnName": "cash_balance",
      "type": "integer"
    },
    "frozenBalance": {
      "columnName": "frozen_balance",
      "type": "integer"
    },
    "typeId": {
      "columnName": "type_id",
      "type": "integer"
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
  "tableName": "t_transaction"
}
