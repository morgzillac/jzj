/**
* tUserAddress.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "addressId": {
      "columnName": "address_id",
      "required": true,
      "type": "integer",
      "primaryKey": true
    },
    "userId": {
      "columnName": "user_id",
      "type": "integer"
    },
    "addressTypeId": {
      "columnName": "address_type_id",
      "type": "integer"
    },
    "recipient": {
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
    "district": {
      "type": "string",
      "size": 45
    },
    "streetAddress": {
      "columnName": "street_address",
      "type": "string",
      "size": 45
    },
    "postalCode": {
      "columnName": "postal_code",
      "type": "string",
      "size": 45
    },
    "phone": {
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
  "tableName": "t_user_address"
}