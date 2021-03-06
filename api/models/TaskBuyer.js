/**
* tTaskBuyer.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  migrate: 'alter',
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
    "ipAddress": {
      "columnName": "ip_address",
      "type": "string",
      "size": 50
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

  beforeCreate: function (rec, next) {
    //update assigned count in ShopTask
    console.log('before create' + JSON.stringify(rec));
      //todo: check whether we allow creating new
      UtilsService.canTakeTask(rec.taskId, function (err, result){
        if (err) {
          sails.log.error(err);
          next(err);
        }
        if (!result) {
          sails.log.warn('任务已经完成，不能接单！');
          next(new Error('任务已经完成，不能接单！'));
        }
        next();
      });

  },

  afterCreate: function (rec, next) {
    //update assigned count in ShopTask
    console.log('after create' + JSON.stringify(rec));
    if (rec) {
      //todo: get rid of sql execution
      UtilsService.updateShopTaskCounts (rec.taskId);
    }
    next();
  },

  afterUpdate: function (rec, next) {
    if (rec) {
      UtilsService.updateShopTaskCounts (rec.taskId);
    }
    next();

  },

  afterDestroy: function (records, next) {
    //update assigned count in ShopTask
    if (records.count > 0) {
      //todo: get rid of sql execution
      UtilsService.updateShopTaskCounts (records[0].taskId);
    }
    next();

  },

  "tableName": "t_task_buyer"
};

