/**
* tPostPublished.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "postStatusId": {
      "columnName": "post_status_id",
      "required": true,
      "type": "integer",
      "primaryKey": true
    },
    "postId": {
      "columnName": "post_id",
      "type": "integer"
    },
    "startTime": {
      "columnName": "start_time",
      "type": "datetime"
    },
    "endTime": {
      "columnName": "end_time",
      "type": "datetime"
    },
    "displayOrder": {
      "columnName": "display_order",
      "type": "integer"
    },
    "createdAt": {
      "columnName": "created_at",
      "type": "datetime"
    },
    "createdBy": {
      "columnName": "created_at",
      "type": "string",
      "size": 45
    },
    "updatedAt": {
      "columnName": "updated_time",
      "type": "datetime"
    },
    "updatedBy": {
      "columnName": "updated_by",
      "type": "string",
      "size": 45
    }
  },
  "tableName": "t_post_published"
}