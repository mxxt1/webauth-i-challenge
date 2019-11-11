const router = require('express').Router();
const bcrypt = require('bcryptjs');

//model
const api = require('./api-model');


// /user/auth/

//login

router.post('/login', (req, res) => {
    let {username, password} = req.headers;

    api.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)){
            res.status(200).json({message: `Welcome ${user.username}`});
        } else {
            res.status(401).json({error: `${user.username} not found`});
        }
    })
    .catch(err => {
        res.status(500).json(err); 
    });
});


//signup 

router.post('/register', (req, res) => {
   let user = req.body;
   
   let hashedPass = bcrypt.hashSync(user.password, 12);

   user.password = hashedPass;

   api.addUser(user)
   .then(response => {
       res.status(201).json(response)
   })
   .catch(error => {
       res.status(500).json(error);
   }) 
})

module.exports = router;