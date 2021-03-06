/**
* tShopTask.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  migrate: 'alter',
  "attributes": {
    "taskId": {
      "columnName": "task_id",
      autoIncrement: true,
      "type": "integer",
      "primaryKey": true
    },
    "userId":{
      "columnName":"user_id",
      "type": "integer"
    },
    "shopId":{
      "columnName":"shop_id",
      model:'SellerShop',
      via: 'shopId'
    },
    "productId": {
      "columnName": "product_id",
      model:'ShopProduct',
      via: 'productId'
    },
    "productPrice": {
      "columnName": "product_price",
      "type": "integer"
    },
    "productCount": {
      "columnName": "product_count",
      "type": "integer"
    },
    "commission": {
      "type": "integer"
    },
    //加赏
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
    "platformId": {
      "columnName": "platform_id",
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
    "status": {
      "type": "string",
      "size": 45
    },
    "comment": {
      "type": "string",
      "size": 255
    },
    //task JSON
    "taskDetail": {
      "columnName": "task_detail",
      "type": "string",
      "size": 4000
    },
    //优先审单
    "approvalPriority": {
      "columnName": "approval_priority",
      "type": "boolean"
    },
    //提升速度
    "taskPriority": {
      "columnName": "task_priority",
      "type": "boolean"
    },
    //包邮
    "includeShipping": {
      "columnName": "include_shipping",
      "type": "boolean"
    },
    keywords:{
      collection: 'TaskKeyword',
      via: 'taskId'
    },
    "assigned": {
      "type": "integer"
    },
    "pending": {
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
  "tableName": "t_shop_task"
}
