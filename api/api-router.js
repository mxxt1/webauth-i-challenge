const router = require('express').Router();
const bcrypt = require('bcryptjs');
const requireAuth = require('../middleware/requireAuth.js');

//model
const api = require('./api-model');

//routers 

const authRouter = require('./auth-router');

router.use('/auth', authRouter);

//get all users if current user is auth'd

router.get('/all', requireAuth, (req,res) => {
    
    api.getAll()
    .then(users => {
        res.status(200).json(users);
    })
    .catch((error) => {
        res.status(401).json({error: `failed to retrieve users, make sure you are logged in: ${error}`});
    });
});




//get users own data if auth'd

router.get('/', requireAuth, (req,res) => {
    let {username} = req.headers;
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