/**
* tShopProduct.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
//  migrate: 'alter',
  "attributes": {
    "productId": {
      "columnName": "product_id",
      autoIncrement: true,
      "type": "integer",
      "primaryKey": true
    },
    "shopId": {
      "columnName": "shop_id",
      model: 'SellerShop'
    },
    "productPrice": {
      "columnName": "product_price",
      "type": "integer"
    },
    "productExtID": {
      "columnName": "product_ext_id",
      "type": "string",
      index: true,
      "size": 50
    },
    "productName": {
      "columnName": "product_name",
      "type": "string",
      index: true,
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
    "statusId": {
      "columnName": "status_id",
      "type": "integer"
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
  "tableName": "t_shop_product"
}
