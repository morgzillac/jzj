var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,
	"tableName": "t_user",

  "attributes": {
    "userId": {
      "columnName": "user_id",
      "type": "integer",
       autoIncrement: true,
     "primaryKey": true
    },
    "userTypeId": {
      "columnName": "user_type_id",
      "type": "integer"
    },
     "image": {
      "columnName": "image",
      "type": "string",
      "size": 145
    },
     "password": {
       "type": "string",
       "size": 45
     },
    "payPassword": {
      "columnName": "pay_password",
      "type": "string",
      "size": 45
    },
    "mobile": {
      "type": "string",
      "size": 45
    },
    "email": {
      "type": "email", unique: true
    },
    "qq": {
      "type": "string",
      "size": 45
    },
    "wechat": {
      "type": "string",
      "size": 45
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
   
    "banks":{
      collection:'UserBank',
      via: 'userId'
    },
    
    username  : {  
     "columnName": "user_login",
      "type": "string",
      "size": 45,
      unique: true 
    },

    passports : { collection: 'Passport', via: 'user' }

  },

login: function (req, res) {
    var statusCode = 200;
    var result = {
      status: statusCode
    };  
    User.find({ userLogin: req.param('login'), 
            password: req.param('password') 
          })
          .populate('banks')
          .exec(function cb(err,user){
              if (err) return cb(err);
              console.log('We found 1'+ user);
              return res.json(user);
          });
    },

    beforeCreate: function (attrs, next) {
    var bcrypt = require('bcrypt');

    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(attrs.password, salt, function(err, hash) {
        if (err) return next(err);

        attrs.password = hash;
        next();
      });
    });

  },

   login2: function (req, res) {
    var bcrypt = require('bcrypt');

    User.findOneByEmail(req.body.email).done(function (err, user) {
      if (err) res.json({ error: 'DB error' }, 500);

      if (user) {
        bcrypt.compare(req.body.password, user.password, function (err, match) {
          if (err) res.json({ error: 'Server error' }, 500);

          if (match) {
            // password match
            req.session.user = user.id;
            res.json(user);
          } else {
            // invalid password
            if (req.session.user) req.session.user = null;
            res.json({ error: 'Invalid password' }, 400);
          }
        });
      } else {
        res.json({ error: 'User not found' }, 404);
      }
    });
   
  }

};

module.exports = User;
