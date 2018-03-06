/**
 * Created by sirius on 6/12/17.
 */

let path    = require('path'),
    errHand = require('../helpers/errorHandler.js'),
    multer  = require('multer'),
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '~/WebstormProjects/BeeWeb/beeweb/uploads')
        },
        filename: (req, file, cb) => {
            let datetimestamp = Date.now();
            let extension = file.originalname.split('.')[file.originalname.split('.').length -1];
            cb(null, file.fieldname + '-' + datetimestamp + '.' + extension)
        }
    }),
    upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            let ext = path.extname(file.originalname);
            console.log('ext -> ', ext);
            let mime = file.mimetype;
            console.log('mime -> ', mime);
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return callback(errHand(res, 400, {}, 'Only images are allowed'))
            }
            callback(null, true)
        },
        limits:{
            fieldNameSize: 50,
            fileSize: 100 * 1024 * 1024
        }
    }).single('image');

module.exports = upload;