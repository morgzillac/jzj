/**
* tCashout.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  migrate: 'drop',
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
      "type": "integer"
    },
    "points": {
      "type": "integer"
    },
    "fee": {
      "type": "integer"
    },
    "cashoutTypeId": {
      "columnName": "cashout_type_id",
      "type": "integer"
    },
    "cashoutTime": {
      "columnName": "cashout_time",
      "type": "datetime"
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
