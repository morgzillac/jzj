/**
* tShopProduct.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "productId": {
      "columnName": "product_id",
      "required": true,
      "type": "integer",
      "primaryKey": true
    },
    "shopId": {
      "columnName": "shop_id",
      "type": "integer"
    },
    "productPrice": {
      "columnName": "product_price",
      "type": "integer"
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
  "tableName": "t_shop_product"
}