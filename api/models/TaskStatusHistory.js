/**
* tTaskStatusHistory.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "taskStatusHistoryId": {
      "columnName": "task_status_history_id",
      "required": true,
      "type": "integer",
      "primaryKey": true
    },
    "statusId": {
      "columnName": "status_id",
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
    }
  },
  "tableName": "t_task_status_history"
}