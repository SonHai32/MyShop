const {Router} = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const router = Router();
const users = require('../Models/Users.js');



router.post('/', (req, res, next) =>{
    users.findOne({username: req.body.username}, (err, user) =>{
        if(err) next(err);
        if(!user){
            res.json({success: false, message: "Authentication failed. User not found"})
        }else if(user){
            bcrypt.compare(req.body.password, user.password, (err, result) =>{
                if(err) next(err);
                if(!result){
                    res.json({success: false, message: "Authentication failed. Wrong Password"})
                }else{
                    const token = jwt.sign(user.toJSON(), process.env.secret, {expiresIn: '60m'})
                    res.json({
                        success: true,
                        massage: 'enjoy',
                        token: token
                    })
                }
            })
        }
    })
})



module.exports = router;
