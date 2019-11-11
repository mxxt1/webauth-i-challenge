const db = require('../database/dbConfig.js');

module.exports = {
    getAll,
    findBy,
    findById,
    addUser
};

//getAll
function getAll() {
    return db('users').select('id','username');
}

//findBy

function findBy(param){
    return db('users').where(param);
}

//findById

function findById(id){
    return db('users')
    .select('id', 'username')
    .where({id})
    .first();
}

//addUser

function addUser(user){
    return db('users')
    .insert(user)
    .then(ids => {
        const [id] = ids;
        return(findById(id));
    });
}




