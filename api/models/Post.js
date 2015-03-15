/**
* tPost.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  migrate: 'drop',
  "attributes": {
    "postId": {
      "columnName": "post_id",
      autoIncrement: true,
      "type": "integer",
      "primaryKey": true
    },
    "postType": {
      "columnName": "post_type",
      "type": "string",
      "size": 45
    },
    "title": {
      "type": "string",
      "size": 45
    },
    "filePath": {
      "columnName": "file_path",
      "type": "string",
      "size": 500
    },
    "content": {
      "columnName": "content",
      "type": "string",
      "size": 4000
    },
    "statusId": {
      "columnName": "status_id",
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
  "tableName": "t_post"
}
