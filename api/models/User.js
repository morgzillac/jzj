/**
* tUser.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "id": {
      "columnName": "user_id",
      "type": "integer",
       autoIncrement: true,
      "required": true,
     "primaryKey": true
    },
    "userTypeId": {
      "columnName": "user_type_id",
      "type": "integer"
    },
    "userLogin": {
      "columnName": "user_login",
      "type": "string",
      "size": 45
    },
    "password": {
      "type": "string",
      "size": 45
    },
    "payPassword": {
      "columnName": "pay_password",
      "type": "string",
      "size": 45
    },
    "mobile": {
      "type": "string",
      "size": 45
    },
    "email": {
      "type": "string",
      "size": 45
    },
    "qq": {
      "type": "string",
      "size": 45
    },
    "wechat": {
      "type": "string",
      "size": 45
    },
    "createdAt": {
      "columnName": "created_time",
      "type": "datetime"
    },
    "createdBy": {
      "columnName": "created_by",
      "type": "string",
      "size": 45
    },
    "updatedAt": {
      "columnName": "lastupdated_time",
      "type": "datetime"
    },
    "lastupdatedBy": {
      "columnName": "lastupdated_by",
      "type": "string",
      "size": 45
    }
  },
  "tableName": "t_user"
}