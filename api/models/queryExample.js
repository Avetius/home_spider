/**
 * Created by sirius on 10/17/17.
 */
Barrier.belongsToMany(User, { through: RelUserBarrier});
User.belongsToMany(Barrier, { through: RelUserBarrier});
Barrier.findAll({
    include: [{
        model: User,
        attributes:['id', 'subTopic', 'email']
    }]
})
    .then(responseWithResult(res))
    .catch(handleError(res));