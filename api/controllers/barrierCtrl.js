/**
 * Created by sirius on 10/12/17.
 * todo add ctrl to getAll, getById, getByUser
 */
const bcrypt        = require('bcrypt-nodejs');
const Barrier       = require('../models/barriers/barrier.model');
const errorHandler  = require('../helpers/errorHandler.js');
const response      = require('../helpers/response.js');

exports.create = (req, res, next) => {
    return Barrier.create({
        name: req.body.name,
        password: req.body.password,
        button0name: req.body.button0name,
        button1name: req.body.button1name,
        button2name: req.body.button2name,
        button3name: req.body.button3name,
        pubTopic: req.body.name+'/pub',
        willTopic: req.body.name+'/will',
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        altitude: req.body.altitude
    })
        .then((barrier) => {
            return response(res, 201, barrier, "created");
        })
        .catch(err => {
            console.log('error in barrierCreate ->',err.errors[0].path + ' is already taken');
            return response(res, 400, {}, err.errors[0].path + ' is already taken');
        })
};

/**
* Update Barrier
* */
exports.update = (req, res, next) => {
    let id = req.params.id;
    let BarrierObj = {};
    let keys = [];
    for (let key in req.body){
        keys.push(key);
        BarrierObj[key] = req.body[key];
        console.log('key -> '+key+' value -> '+req.body[key])
    }

    return Barrier.update(
        {
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password),
            button0name: req.body.button0name,
            button1name: req.body.button1name,
            button2name: req.body.button2name,
            button3name: req.body.button3name,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            altitude: req.body.altitude
        },
        {where:{id:id}}
    ).then((updated) => { // returning array []
        console.log('updated in updated -> ',updated);
        return Barrier.findById(id).then((barrier) => {
            console.log('barrier in updated -> ',barrier);
            if(barrier.name){
                return response(res, 200, {asd:"asd"}, "success")
            }
        }).catch(err =>{
            return response(res, 401, err, "failed")
        })
    }).catch(err =>{
        return response(res, 401, err, "failed")
    })
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    return Barrier.destroy({
        where: {
            id: id
        }
    }).then(() => {
        return response(res, 200, {}, "success");
    })
};

exports.getAll = (req, res, next) => {
    console.log('barrierCtrl getAll...');
    res.send({});
};

exports.getById = (req, res, next) => {
    console.log('barrierCtrl getById...');
    res.send({});
};

exports.getByUser = (req, res, next) => {
    console.log('barrierCtrl getByUser...');
    res.send({});
};