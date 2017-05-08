'use strict';

/**
 * Application enumeration of constants.
 *
 * @access public
 * @namespace api\enumerations\Constants
 *
 * @author Avetuis
 * @copyright 2017
 *
 * @see <a href='https://github.com/adrai/enum'>Node js enumeration</a>
 * */

let Enum = require('enum');

module.exports = new Enum({

    /**
     * Api namespace.
     * @type String
     * */
    API_ROUTE: '/api',

    /**
     * Api users namespace.
     * @type String
     * */
    USERS_ROUTE: '/users',

    /**
     * Api dbs namespace.
     * @type String
     * */
    DB_ROUTE: '/dbs',

    /**
     * Key for user saving for request
     * @type String
     * */
    AUTH_USER: 'user',

    /**
     * Validation rules error name.
     * @type String
     * */
    VALIDATION_ERROR: 'ValidationError',

    /**
     * Error code for resource duplicate.
     * @type String
     * */
    MONGODB_DUPLICATE_ERROR_CODE: 11000,

    /**
     * Sort index for MongoDb
     * @type String
     * */
    MONGODB_SORT_ASC: 1,

    /**
     * Desc sort index for MongoDb
     * @type String
     * */
    MONGODB_SORT_DESC: -1
});