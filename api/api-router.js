const router = require('express').Router();
const bcrypt = require('bcryptjs');
const requireAuth = require('../middleware/requireAuth.js');

//model
const api = require('./api-model');

//routers 

const authRouter = require('./auth-router');

router.use('/auth', authRouter);

//get all users if auth'd

router.get('/', requireAuth, (req,res) => {
    let {username, password} = req.headers;
    console.log(username);
    api.findBy({username})
    .then(users => {
        res.status(200).json(users);
    })
    .catch((error) => {
        res.status(401).json({error: `failed to retrieve users, make sure you are logged in: ${error}`});
    });
});


module.exports = router;