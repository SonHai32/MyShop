const {Router} = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const users = require('../Models/Users.js');


const router = Router();

router.get('/', (req, res, next) =>{
    const token = req.query.token || req.body.token || req.params.token || req.headers['token'];
    if(token !== null){
        jwt.verify(token, process.env.secret, (err, user) =>{
            if(err){
                return res.json({
                    success: false,
                    message: "Failed to authenticate token" 
                })
            }else{
                req.user = user
                res.json(req.user)

            }
        }) 
    }else{
        return res.status(403).send({
            success: false,
            message: "No token provided"
        })
    }
})


router.post('/Create', (req, res, next) =>{
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
        users.findById(userId, (err, result) =>{
           if(!err && result){
                if(user.password){
                    bcrypt.hash(user.password, 10, (err, hashPassword) =>{
                        user.password = hashPassword;
                        updateUser(userId, user, res, next) 
                })
                }else{
                    updateUser(userId, user, res, next)
                }
            }else{
                res.status(404)
                res.json({
                    Message: "ERROR: NOT FOUND"
                })
            } 
        })
         
})



module.exports = router;
