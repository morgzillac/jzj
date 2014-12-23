/**
* tSellerShop.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "shopId": {
      "columnName": "shop_id",
      "required": true,
      "type": "integer",
      "primaryKey": true
    },
    "platformId": {
      "columnName": "platform_id",
      "type": "integer"
    },
    "userId": {
      "columnName": "user_id",
      "type": "integer"
    },
    "url": {
      "type": "string",
      "size": 2000
    },
    "wangwang": {
      "type": "string",
      "size": 45
    },
    "province": {
      "type": "string",
      "size": 45
    },
    "city": {
      "type": "string",
      "size": 45
    },
    "street": {
      "type": "string",
      "size": 500
    },
    "postcode": {
      "type": "string",
      "size": 45
    },
    "comment": {
      "type": "string",
      "size": 2000
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
  "tableName": "t_seller_shop"
}