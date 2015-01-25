/**
* tPointsTransaction.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "pointsTranId": {
      "columnName": "points_tran_id",
      autoIncrement: true,
      "type": "integer",
      "primaryKey": true
    },
    "amount": {
      "type": "integer"
    },
    "typeId": {
      "columnName": "type_id",
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
    }
  },
  "tableName": "t_points_transaction"
}
