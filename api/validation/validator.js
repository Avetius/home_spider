/**
 * Created by sirius on 5/20/17.
 * */
const expressAjv = require('express-ajv');
const schema = expressAjv.schema;

//admin validations
const userSignUp    = require('./usersRules/userSignUp.json');
const userLogin     = require('./usersRules/userLogin.json');
const userEdit      = require('./usersRules/userEdit.json');
const userCreate    = require('./usersRules/userCreate.json');

const barrierCreate = require('./barrierRules/barrierCreate.json');
const barrierEdit   = require('./barrierRules/barrierEdit.json');

schema.addSchema('userSignUp', userSignUp);
schema.addSchema('userLogin', userLogin);
schema.addSchema('userEdit', userEdit);
schema.addSchema('userCreate', userCreate);

schema.addSchema('barrierCreate', barrierCreate);
schema.addSchema('barrierEdit', barrierEdit);

//to prevent raise condition in your routes use this module
module.exports = expressAjv.validatorFactory;

// todo make loop for requireing all jsons and addScheme them with their names