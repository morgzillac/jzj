/**
* TaskBuyerActivityDetail.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  migrate:'alter',
  "attributes": {
    "tbaDetailId": {
      "columnName": "tba_detail_id",
      autoIncrement: true,
      "type": "integer",
      "primaryKey": true
    },
    "tbActivityId": {
      "model":"user",
      "columnName": "tb_activity_id",
      "type": "integer"
    },
    "stepData": {
      "columnName": "step_data",
      "type": "string"
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
  "tableName": "t_task_buyer_activity_detail"
};

