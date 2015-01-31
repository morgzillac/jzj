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
    // Apply 'isAdmin' to the 'foo' action.  'isLoggedIn' will NOT be applied!
    'login': true,
    'create': true,
    'resetPasswordRequest': true,
    'resetPassword': true
  },

  Transaction: {
    // Apply 'isAdmin' to the 'foo' action.  'isLoggedIn' will NOT be applied!
    'find': ['IsLoggedIn', 'UserFilter'],
    'findOne': ['IsLoggedIn', 'UserFilter']
  },
  Cashout: {
    // Apply 'isAdmin' to the 'foo' action.  'isLoggedIn' will NOT be applied!
    'find': ['IsLoggedIn', 'UserFilter'],
    'findOne': ['IsLoggedIn', 'UserFilter']
  },
  Points2Cash: {
    // Apply 'isAdmin' to the 'foo' action.  'isLoggedIn' will NOT be applied!
    'find': ['IsLoggedIn', 'UserFilter'],
    'findOne': ['IsLoggedIn', 'UserFilter']
  },
  Recharge: {
    // Apply 'isAdmin' to the 'foo' action.  'isLoggedIn' will NOT be applied!
    'find': ['IsLoggedIn', 'UserFilter'],
    'findOne': ['IsLoggedIn', 'UserFilter']
  }




};

