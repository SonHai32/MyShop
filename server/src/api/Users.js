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

const updateUser = (ID, user, res, next) =>{
    try{
        users.updateOne({"_id": ID}, {$set: user}, (err, result) =>{
            if(err){
                res.json({
                    message:`ERROR : ${process.env.NODE_ENV === 'production' ? 'SOME THING WENT WRONG' : err.message}`,
                })
                return next(err);
            }

            res.send({
                message: `updated ${ID}`
            })
        })
    }catch(err){ 
        next({
            message: "ERROR",
            error: err
        })
    } 
}


router.put('/Update/:id', (req, res, next) =>{
        const userId = req.params.id
        let user = req.body;
        if(user.password){
            bcrypt.hash(user.password, 10, (err, hashPassword) =>{
                user.password = hashPassword;
                updateUser(userId, user, res, next)
                
            })
        }else{

            updateUser(userId, user, res, next)
           
        } 
})

module.exports = router;
