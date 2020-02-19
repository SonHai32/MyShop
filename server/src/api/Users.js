const {Router} = require('express');
const bcrypt = require('bcrypt')

const users = require('../Models/Users.js');


const router = Router();


const Users = require('../Models/Users')

router.get('/', async(req, res, next) =>{
    try{
        const users = await Users.find();
        res.json(users)
    }catch(err){
        next(err);
    }
})


router.post('/', (req, res, next) =>{
    let newUser = new users(req.body);
    bcrypt.hash(newUser.password, 10, async (err, hash) =>{
        try{
            newUser.password = hash;
            let savedNewUser = await newUser.save();

            res.json({
                message: "created",
                ...savedNewUser
            })
        }catch(err){
            next(err)
        }
    })
})

module.exports = router;
