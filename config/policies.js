/**
 * Policy mappings (ACL)
 *
 * Policies are simply Express middleware functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect just one of its actions.
 *
 * Any policy file (e.g. `authenticated.js`) can be dropped into the `/policies` folder,
 * at which point it can be accessed below by its filename, minus the extension, (e.g. `authenticated`)
 *
 * For more information on policies, check out:
 * http://sailsjs.org/#documentation
 */


module.exports.policies = {

  // Default policy for all controllers and actions (`true` allows public access)
  '*': 'IsLoggedIn',
  //'*':true,

  User: {
    // no need to be logged in
    'login': true,
    'create': true,
    'resetPasswordRequest': true,
    'resetPassword': true
    //
  },

  Bill: {
    // no need to be logged in
    'send': true,
    'rec':true,
    'result':true
    //
  },

  Transaction: {
    // must be logged in and have userId in criteria
    'find': ['IsLoggedIn', 'UserFilter'],
    'findOne': ['IsLoggedIn', 'UserFilter'],

    //this is readonly
    create: 'readonly',
    update: 'readonly',
    destroy: 'readonly'
  },
  Cashout: {
    // must be logged in and have userId in criteria
    'find': ['IsLoggedIn', 'UserFilter'],
    'findOne': ['IsLoggedIn', 'UserFilter'],

    //this is readonly
    create: 'readonly',
    update: 'readonly',
    destroy: 'readonly'
  },
  Points2Cash: {
    // must be logged in and have userId in criteria
    'find': ['IsLoggedIn', 'UserFilter'],
    'findOne': ['IsLoggedIn', 'UserFilter'],

    //this is readonly
    create: 'readonly',
    update: 'readonly',
    destroy: 'readonly'
  },

  Recharge: {
    // must be logged in and have userId in criteria
    'find': ['IsLoggedIn', 'UserFilter'],
    'findOne': ['IsLoggedIn', 'UserFilter'],

    //this is readonly
    create: 'readonly',
    update: 'readonly',
    destroy: 'readonly'
  },

  TaskBuyer : {
    // must be logged in and have userId in criteria
    'find': ['IsLoggedIn', 'UserFilter'],
    'findOne': ['IsLoggedIn', 'UserFilter']
  },


  //* test only
  File: {
    'index': true,
    'upload': true
  },

  Transaction: {
    // must be logged in and have userId in criteria
    'find': ['IsLoggedIn', 'UserFilter'],
    'findOne': ['IsLoggedIn', 'UserFilter'],
    //test only
    'csv': true
  },

  VWShopTask: {
    // must be logged in and have userId in criteria
    'find': ['IsLoggedIn', 'UserFilter'],
    'findOne': ['IsLoggedIn', 'UserFilter']
  },

  VWTaskBuyer: {
    // must be logged in and have userId in criteria
    'find': ['IsLoggedIn', 'UserFilter'],
    'findOne': ['IsLoggedIn', 'UserFilter']
  },

  Test: {
    // no need to be logged in
    'log': true
    //
  }


};

