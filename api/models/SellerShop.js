/**
* tSellerShop.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  migrate: 'drop',
  "attributes": {
    "shopId": {
      "columnName": "shop_id",
      autoIncrement: true,
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
  "tableName": "t_seller_shop"
}
