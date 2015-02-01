/**
* tFeaturedTask.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
//  migrate: 'drop',
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
      "columnName": "start_at",
      "type": "datetime"
    },
    "endTime": {
      "columnName": "end_at",
      "type": "datetime"
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
  "tableName": "t_featured_task"
}
