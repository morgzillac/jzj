/**
* tShopTask.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "taskId": {
      "columnName": "task_id",
      "required": true,
      "type": "integer",
      "primaryKey": true
    },
    "shopId": {
      "columnName": "shop_id",
      "type": "integer"
    },
    "productId": {
      "columnName": "product_id",
      "type": "integer"
    },
    "productPrice": {
      "columnName": "product_price",
      "type": "integer"
    },
    "commission": {
      "type": "integer"
    },
    "bonus": {
      "type": "integer"
    },
    "totalTasks": {
      "columnName": "total_tasks",
      "type": "integer"
    },
    "terminal": {
      "type": "string",
      "size": 45
    },
    "taskTypeId": {
      "columnName": "task_type_id",
      "type": "integer"
    },
    "payById": {
      "columnName": "pay_by_id",
      "type": "integer"
    },
    "status": {
      "type": "string",
      "size": 45
    },
    "comment": {
      "type": "string",
      "size": 45
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
  "tableName": "t_shop_task"
}