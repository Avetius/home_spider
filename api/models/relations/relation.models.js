/**
 * Created by sirius on 10/13/17.
 */
const User = require('../users/user.model.js');
const Barrier = require('../barriers/barrier.model.js');
const RelUserBarrierSchema = require('./relation.schema');

const RelUserBarrier = sequelize.define('userProjects', RelUserBarrierSchema)

User.belongsToMany(Barrier, { through: RelUserBarrier });
Barrier.belongsToMany(User, { through: RelUserBarrier });