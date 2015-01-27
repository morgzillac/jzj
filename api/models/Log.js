/**
 * Log.js
 *
 * @description :: TODO: Write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  "schema": true,
  "attributes": {
    "id": {
      "required": true,
      "type": "integer",
      "autoIncrement": true,
      "primaryKey": true
    },
    "code": {
      "type": "string",
      "size": 10
    },
    "msg": {
      "type": "text"
    },
    "createdAt": {
      "columnName": "created_at",
      "defaultsTo": "CURRENT_TIMESTAMP",
      "type": "datetime"
    }
  },
  "tableName": "t_log"
}
