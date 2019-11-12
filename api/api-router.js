const router = require('express').Router();
// const requireAuth = require('../middleware/requireAuth.js');
const restricted = require('../middleware/restrictedMW.js');

//model
const api = require('./api-model');

//routers 

const authRouter = require('./auth-router');

router.use('/auth', authRouter);

//get all users if current user is auth'd

router.get('/all', restricted, (req,res) => {
    
    api.getAll()
    .then(users => {
        res.status(200).json(users);
    })
    .catch((error) => {
        res.status(401).json({error: `failed to retrieve users, make sure you are logged in: ${error}`});
    });
});


//get users own data if auth'd

router.get('/', restricted, (req,res) => {
    let {username} = req.session;
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