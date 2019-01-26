/**
 * Created by sirius on 10/12/17.
 * todo add ctrl to getAll, getById, getByUser
 */
const bcrypt        = require('bcrypt-nodejs');
const Barrier       = require('../models/barriers/barrier.model');
const User          = require('../models/users/user.model');
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
            if(!barrier.name) return response(res, 404, {}, "not found!");
            return response(res, 200, {asd:"asd"}, "success")
        }).catch(err =>{
            return response(res, 404, err, "not found")
        })
    }).catch(err =>{ return response(res, 404, err, "not found") })
};

exports.setRel = (req,res, next) => {
    Barrier.findById(req.params.id)
        .then(barrier => {
            if(!barrier) response(res, 404, {"err":"barrier was not found"}, "barrier with that id not found");
            return barrier.addUser(req.body.id)
                .then(response(res, 200, {user_id:req.body.id,barrier_id:req.params.id}, "successfully binded"))
                .catch(response(res, 404, {"err":"barrier.addUser failed"}, "problems with adding or setting a user"))
        })
        /*.then(res.send.bind(res))*/
        .catch((err) => {
            console.log('err in uptRel -> ',err);
            return response(res, 404, err, "uptRel query error")
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


exports.addRel = (req,res, next) => {
    Barrier.findById(req.params.id)
        .then(barrier => {
            if(!barrier) return response(res, 404, err, "barrier with that id not found");
            barrier.addUser(req.body.id)
                .then(result =>{
                    return response(res, 200, {user_id:req.body.id,barrier_id:req.params.id}, "successfully binded")
                })
                .catch(err => {
                    response(res, 404, err, "problems with adding or setting a user")
                })
        })
        /*.then(res.send.bind(res))*/
        .catch(err => {console.log('err in uptRel -> ',err); return response(res, 404, err, "uptRel query error") })
};

exports.getAll = (req, res, next) => {
    console.log('barrierCtrl getAll...');
    Barrier.findAll().then(barriers =>{
        if(!barriers) return response(res, 404, {}, "getAll barriers not found");
        return response(res, 200, barriers, "success")
    }).catch(err => {
        console.log('err -> ',err);
        return response(res, 404, err, "getAll query error")
    })
};

exports.getByIdRel = (req, res, next) => {
    console.log('barrierCtrl getByIdRel...');
    Barrier.find({
        where:{id:req.params.id},
        attributes:['subTopic'],
        include: [{
            model: User,
            attributes:['subTopic']
        }]
    }).then(barriers =>{
        if(!barriers) return response(res, 404, {}, "getAll barriers not found");
        return response(res, 200, barriers, "success")
    }).catch(err => {
        console.log('err -> ',err);
        return response(res, 404, err, "getAll query error")
    })
};

exports.getAllRel = (req, res, next) => {
    console.log('barrierCtrl getAllRel...');
    Barrier.findAll({
        include: [{
            model: User,
            through:{attributes:['subTopic']}
        }]
    }).then(barriers =>{
        if(!barriers) return response(res, 404, {}, "getAll barriers not found");
        return response(res, 200, barriers, "success")
    }).catch(err => {
        console.log('err -> ',err);
        return response(res, 404, err, "getAll query error")
    })
};

exports.getById = (req, res, next) => {
    Barrier.findById(req.params.id).then(barrier =>{
        if(!barrier) return response(res, 404, {}, "not found");
        return response(res, 200, barrier, "success")
    });
};

exports.getByName = (req, res, next) => {
    Barrier.findOne({
        where: {email:req.user}
    }).then(barrier =>{
        if(!barrier) return response(res, 404, {}, "not found");
        return response(res, 200, barrier, "success")
    });
};