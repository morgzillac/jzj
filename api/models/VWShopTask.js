/**
* vShopTask.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  migrate: 'safe',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,
  "attributes": {
    "shopId": {
      "columnName": "shop_id",
      "type": "integer"
    },
    "commission": {
      "type": "integer"
    },
    "bonus": {
      "type": "integer"
    },
    "terminal": {
      "type": "string",
      "size": 45
    },
    "status": {
      "type": "string",
      "size": 45
    },
    "comment": {
      "type": "string",
      "size": 255
    },
    "taskId": {
      "columnName": "task_id",
      "required": true,
      "defaultsTo": "0",
      "type": "integer"
    },
    "productId": {
      "columnName": "product_id",
      "type": "integer"
    },
    "shopProductPrice": {
      "columnName": "shop_product_price",
      "type": "integer"
    },
    "productExtId": {
      "columnName": "product_ext_id",
      "type": "string",
      "size": 50
    },
    "productName": {
      "columnName": "product_name",
      "type": "string",
      "size": 255
    },
    "productDesc": {
      "columnName": "product_desc",
      "type": "string",
      "size": 2000
    },
    "productImage": {
      "columnName": "product_image",
      "type": "string",
      "size": 500
    },
    "statusId": {
      "columnName": "status_id",
      "type": "integer"
    },
    "totalTasks": {
      "columnName": "total_tasks",
      "type": "integer"
    },
    "taskTypeId": {
      "columnName": "task_type_id",
      "type": "integer"
    },
    "payById": {
      "columnName": "pay_by_id",
      "type": "integer"
    },
    "approvalPriority": {
      "columnName": "approval_priority",
      "type": "integer"
    },
    "taskPriority": {
      "columnName": "task_priority",
      "type": "integer"
    },
    "includeShipping": {
      "columnName": "include_shipping",
      "type": "integer"
    },
    "taskProductPrice": {
      "columnName": "task_product_price",
      "type": "integer"
    },
    "platformId": {
      "columnName": "platform_id",
      "type": "integer"
    },
    "assigned": {
      "columnName": "assigned",
      "type": "integer"
    },
    "userId": {
      "columnName": "user_id",
      "type": "integer"
    }
  },
  "tableName": "v_shop_task"
}
