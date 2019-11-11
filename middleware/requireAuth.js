const bcrypt = require('bcryptjs');

const user = require('../api/api-model');

module.exports = (req,res,next) => {
    let {username, password} = req.headers;

    if (username && password){
        user.findBy({username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                next();
            } else {
                res.status(401).json({Error: `Invalid credentials`});
            }
        })
        .catch((error) => {
            res.status(500).json({error: `${error}`});
        });
    } else {
        res.status(401).json({error: `please provide valid credentials`});
    } 
};