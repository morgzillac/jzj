/**
* tRecharge.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "rechargeId": {
      "columnName": "recharge_id",
      "required": true,
      "type": "integer",
      "primaryKey": true
    },
    "amount": {
      "type": "integer"
    },
    "points": {
      "type": "integer"
    },
    "rechargeTime": {
      "columnName": "recharge_time",
      "type": "datetime"
    },
    "rechargeTypeId": {
      "columnName": "recharge_type_id",
      "type": "integer"
    },
    "createdTime": {
      "columnName": "created_time",
      "type": "datetime"
    },
    "createdBy": {
      "columnName": "created_by",
      "type": "string",
      "size": 45
    },
    "lastupdatedTime": {
      "columnName": "lastupdated_time",
      "type": "datetime"
    },
    "lastupdatedBy": {
      "columnName": "lastupdated_by",
      "type": "string",
      "size": 45
    }
  },
  "tableName": "t_recharge"
}