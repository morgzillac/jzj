/**
* tUserBalance.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  migrate: 'drop',
  "attributes": {
    "userId": {
      "columnName": "user_id",
      "required": true,
      "primaryKey": true,
      "type": "integer"
    },
    "points": {
      "type": "integer"
    },
    "cash": {
      "type": "integer"
    },
    "cashFrozen": {
      "columnName": "cash_frozen",
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
  "tableName": "t_user_balance"
}
