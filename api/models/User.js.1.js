var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,
	"tableName": "t_user",

  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' }
  }

};

module.exports = User;
