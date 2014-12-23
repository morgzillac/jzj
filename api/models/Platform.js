/**
* tPlatform.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "platformId": {
      "columnName": "platform_id",
      "required": true,
      "type": "integer",
      "primaryKey": true
    },
    "platformName": {
      "columnName": "platform_name",
      "type": "string",
      "size": 45
    },
    "platformUrl": {
      "columnName": "platform_url",
      "type": "string",
      "size": 500
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
  "tableName": "t_platform"
}