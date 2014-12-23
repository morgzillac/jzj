/**
* tTaskBuyerActivity.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "tbActivityId": {
      "columnName": "tb_activity_id",
      "required": true,
      "type": "integer",
      "primaryKey": true
    },
    "taskBuyerId": {
      "columnName": "task_buyer_id",
      "type": "integer"
    },
    "statusId": {
      "columnName": "status_id",
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
    }
  },
  "tableName": "t_task_buyer_activity"
}