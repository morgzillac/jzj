/**
* tTaskBuyerActivity.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  migrate:'drop',
  "attributes": {
    "tbActivityId": {
      "columnName": "tb_activity_id",
      autoIncrement: true,
      "type": "integer",
      "primaryKey": true
    },
    "taskBuyerId": {
      "model":"user",
      "columnName": "task_buyer_id",
      "type": "integer"
    },
    "statusId": {
      "columnName": "status_id",
      "type": "integer"
    },
    "ipAddress": {
      "columnName": "ip_address",
      "type": "string",
      "size":50
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
  "tableName": "t_task_buyer_activity"
}
