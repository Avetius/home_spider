const Ajv       = require('ajv');
const ajv       = new Ajv({ allErrors:true, removeAdditional:'all' });
const files     = require('../helpers/loader.js').getFiles(__dirname, 'users/rules');

files.map(obj => {
    ajv.addSchema(require(obj.path), obj.name)
});

/**
 * @param  {Object} schemaErrors - array of json-schema errors, describing each validation failure
 * @return {String} formatted api response
 */
function errorResponse(schemaErrors) {
    console.log("errorResponse function");
    let errors = schemaErrors.map((error) => {
        return {
            path: error.dataPath,
            message: error.message
        }
    });
    return {
        status: 'failed',
        errors: errors
    }
}

/**
 * @param  {String} schemaName - name of the schema to validate
 * @return {Object} response
 */
let validate = (schemaName) => {
    return (req, res, next) => {
        console.log("kind of validating using ", schemaName);
        let valid = ajv.validate(schemaName, req.body);
        if (!valid) {
            console.log('Validation Error -> ', ajv.errors);
            return res.send(errorResponse(ajv.errors))
        }
        next()
    }
};

module.exports = validate;
