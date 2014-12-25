/**
* tTaskTypes.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "taskTypeId": {
      "columnName": "task_type_id",
      "required": true,
      "type": "integer",
      "primaryKey": true
    },
    "typeName": {
      "columnName": "type_name",
      "type": "string",
      "size": 45
    },
    "platformId": {
      "columnName": "platform_id",
      "type": "integer"
    },
    "commission": {
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
    "updatedAT": {
      "columnName": "updated_at",
      "type": "datetime"
    },
    "updatedBy": {
      "columnName": "updated_by",
      "type": "string",
      "size": 45
    }
  },
  "tableName": "t_task_types"
}