/**
* tFeaturedTask.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "featuredId": {
      "columnName": "featured_id",
      "required": true,
      "type": "integer",
      "primaryKey": true
    },
    "taskId": {
      "columnName": "task_id",
      "type": "integer"
    },
    "typeId": {
      "columnName": "type_id",
      "type": "integer"
    },
    "startTime": {
      "columnName": "start_time",
      "type": "datetime"
    },
    "endTime": {
      "columnName": "end_time",
      "type": "datetime"
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
  "tableName": "t_featured_task"
}