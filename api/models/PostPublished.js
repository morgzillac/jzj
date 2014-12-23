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
  "tableName": "t_post_published"
}