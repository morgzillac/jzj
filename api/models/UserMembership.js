/**
* tUserMembership.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  "attributes": {
    "userMemberId": {
      "columnName": "user_member_id",
      "required": true,
      "type": "integer",
      "primaryKey": true
    },
    "userId": {
      "columnName": "user_id",
      "type": "integer"
    },
    "membershipType": {
      "columnName": "membership_type",
      "type": "string",
      "size": 45
    },
    "cash": {
      "type": "integer"
    },
    "points": {
      "type": "integer"
    },
    "startDate": {
      "columnName": "start_date",
      "type": "datetime"
    },
    "endDate": {
      "columnName": "end_date",
      "type": "datetime"
    },
    "comment": {
      "type": "string",
      "size": 2000
    },
    "status": {
      "type": "string",
      "size": 45
    },
    "createAt": {
      "columnName": "create_at",
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
  "tableName": "t_user_membership"
}