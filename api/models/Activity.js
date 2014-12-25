/**
* tActivity.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "activityId": {
      "columnName": "activity_id",
      "required": true,
      "type": "integer",
      "primaryKey": true
    },
    "typeId": {
      "columnName": "type_id",
      "type": "integer"
    },
    "title": {
      "type": "string",
      "size": 200
    },
    "desc": {
      "type": "string",
      "size": 1000
    },
    "createdAt": {
      "columnName": "created_at",
      "type": "datetime"
    },
    "createdBy": {
      "columnName": "created_by",
      "type": "string",
      "size": 45
    }
  },
  "tableName": "t_activity"
}