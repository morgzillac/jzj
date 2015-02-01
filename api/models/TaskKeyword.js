/**
* tTaskKeyword.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
//  migrate: 'drop',
  "attributes": {
    "keywordId": {
      "columnName": "keyword_id",
      autoIncrement: true,
      "type": "integer",
      "primaryKey": true
    },
    "taskId": {
      "model":"ShopTask",
      "columnName": "task_id",
      "type": "integer"
    },
    "keyword": {
      "type": "string",
      "size": 45
    },
    "category1": {
      "type": "string",
      "size": 45
    },
    "category2": {
      "type": "string",
      "size": 45
    },
    "category3": {
      "type": "string",
      "size": 45
    },
    "category4": {
      "type": "string",
      "size": 45
    },
    "totalTask": {
      "type": "integer"
    },
    "createdAt": {
      "columnName": "created_at",
      "type": "string",
      "size": 45
    },
    "createdBy": {
      "columnName": "created_by",
      "type": "string",
      "size": 45
    }
  },
  "tableName": "t_task_keyword"
}
