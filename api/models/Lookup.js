/**
* tLookup.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "lookupId": {
      "columnName": "lookup_id",
      "required": true,
      "type": "integer",
      "primaryKey": true
    },
    "name": {
      "type": "string",
      "size": 45
    },
    "value": {
      "type": "integer"
    },
    "type": {
      "type": "string",
      "size": 45
    },
    "createdTime": {
      "columnName": "created_time",
      "type": "string",
      "size": 45
    },
    "createdBy": {
      "columnName": "created_by",
      "type": "string",
      "size": 45
    }
  },
  "tableName": "t_lookup"
}