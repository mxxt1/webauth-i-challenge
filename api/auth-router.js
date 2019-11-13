const router = require('express').Router();
const bcrypt = require('bcryptjs');

//model
const api = require('./api-model');


// /user/auth/

//login

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    api.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)){
            req.session.username = user.username;
            res.status(200).json({message: `Welcome ${user.username}`});
        } else {
            res.status(401).json({error: `${user.username} not found`});
        }
    })
    .catch(() => {
        res.status(401).json({error: `User not found`});
    });
});


//signup 

router.post('/register', (req, res) => {
   let user = req.body;
   let hashedPass = bcrypt.hashSync(user.password, 12);
   user.password = hashedPass;

   api.addUser(user)
   .then(response => {
       req.session.username=response.username;
       res.status(201).json(response)
   })
   .catch(error => {
       res.status(500).json(error);
   }) 
})


//logout

router.get("/logout", (req,res) => {
    if(req.session){
        req.session.destroy(err => {
            err ? res.status(500).json({message: `Problem logging out`}) : res.status(200).json({message: `Logged out`});
        });
    } else {
        res.status(200).json({message: `logged out`});
    }
});



module.exports = router;