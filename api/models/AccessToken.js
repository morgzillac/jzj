/**
 * AccessToken
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  connection: 'localDiskDb',
  //connection: 'redis',
  //migrate: 'drop',
  attributes: {
        userId: {
            type: 'string',
            required: true
        },
        token: {
          type: 'string',
          required: true,
          "size": 256
        }
  }

};
