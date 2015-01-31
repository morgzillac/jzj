/**
* tTaskBuyer.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  migrate: 'drop',
  "attributes": {
    "taskBuyerId": {
      "columnName": "task_buyer_id",
      autoIncrement: true,
      "type": "integer",
      "primaryKey": true
    },
    "userId": {
      "columnName": "user_id",
      "type": "integer"
    },
    "taskId": {
      "columnName": "task_id",
      "type": "integer"
    },
    //task JSON
    "taskDetail": {
      "columnName": "task_detail",
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
    },
    beforeCreate: function (attrs, next) {

      if (req.token && req.userData.userId) {
        attrs.userId = req.userData.userId;
        next();
      } else {
        return next(new Error('未登陆'));
      }
    },

    beforeUpdate: function (attrs, next) {
      if (req.token && req.userData.userId) {
        attrs.userId = req.userData.userId;
        next();
      } else {
        return next(new Error('未登陆'));
      }
    }
  },
  "tableName": "t_task_buyer"
}
