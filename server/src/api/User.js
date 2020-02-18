const express = require('express');
const router = express.Router();

const users = require('../Models/User')

router.get('/', async (req, res, next) =>{
    try{
        const Users = await users.find();
        res.json(Users)
    }catch(err){
        next(err)
    }

})


router.post('/', async (req, res, next) =>{

    try{
            
            const User = new users(req.body);
            const createdUser = await User.save();
            res.json({
                createdUser,
                message: 'user created'
            })
            
    }catch(err){
        next(err)
    }
    
})

module.exports = router
