/**
* tBuyerAccount.js
*
* @description :: TODO: Write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  "schema": true,
  migrate: 'drop',

  "attributes": {
    "buyerAccountId": {
      "columnName": "buyer_account_id",
       autoIncrement: true,
      "type": "integer",
      "primaryKey": true
    },
    "userId": {
      "columnName": "user_id",
      "type": "integer"
    },
    "accountLogin": {
      "columnName": "account_login",
      "type": "string",
      "size": 45
    },
    "platformId": {
      "columnName": "platform_id",
      "type": "string",
      "size": 45
    },
    "wangwang": {
      "type": "string",
      "size": 45
    },
    "wwScreenshot": {
      "columnName": "ww_screenshot",
      "type": "string",
      "size": 255
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
    "addressId": {
      "columnName": "address_id",
      model: 'UserAddress'
    }
  },
  "tableName": "t_buyer_account"

  //beforeUpdate: function (data, next){
  //    var addressData = data.addressId;
  //  if (addressData) {
  //    data.remove("addressId");
  //    if (addressData.addressId) {
  //        UserAddress.update({AddressId:addressData.addressId}, addressData, saveAddressCB);
  //      } else {
  //        UserAddress.create(addressData, saveAddressCB);
  //      }
  //    }
  //
  //  function saveAddressCB(err, rec) {
  //    if (err) return next(err);
  //    next ();
  //  }
  //
  //}


}
