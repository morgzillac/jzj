/**
* vTaskBuyer.js
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
    "taskBuyerId": {
      "columnName": "task_buyer_id",
      "required": true,
      "defaultsTo": "0",
      "type": "integer"
    },
    "userId": {
      "columnName": "user_id",
      "type": "integer"
    },
    "taskId": {
      "columnName": "task_id",
      "type": "integer"
    },
    "buyerStatusId": {
      "columnName": "buyer_status_id",
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
    "taskStatus": {
      "columnName": "task_status",
      "type": "string",
      "size": 45
    },
    "taskComment": {
      "columnName": "task_comment",
      "type": "string",
      "size": 255
    },
    "productId": {
      "columnName": "product_id",
      "type": "integer"
    },
    "productPrice": {
      "columnName": "product_price",
      "type": "integer"
    },
    "platformId": {
      "columnName": "platform_id",
      "type": "integer"
    },
    "taskTypeId": {
      "columnName": "task_type_id",
      "type": "integer"
    },
    "shopPrice": {
      "columnName": "shop_price",
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
    "productUrl": {
      "columnName": "product_url",
      "type": "string",
      "size": 500
    },
    "productStatusId": {
      "columnName": "product_status_id",
      "type": "integer"
    },
    "createdAt": {
      "columnName": "created_at",
      "type": "datetime"
    }
  },
  "tableName": "v_task_buyer"
}
