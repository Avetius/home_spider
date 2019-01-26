/**
 * Created by sirius on 5/28/17.
 */
'use strict';

/**
 * @access public
 * @namespace api\middleware\ResponseDTO
 * */

/**
 * @params res Application http response instance
 * @params httpStatus response status enumeration
 * @params data response data transfer object
 * @params message response transfer message
 * @return ResponseDto object
 */
module.exports = function (res, httpStatus, data, message) {

    let response = {
        status: httpStatus.valueOf(),
        name: httpStatus.key,
        message: message,
        data: data
    };
    return res.status(httpStatus.valueOf()).json(response);
};