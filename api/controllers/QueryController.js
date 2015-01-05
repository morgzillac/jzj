/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


    tasks: function (req, res){
      User.query("select * from t_user_address", function(err, result){
          if (err) return res.serverError(err);

         return res.json(result);


      })


    }

};

