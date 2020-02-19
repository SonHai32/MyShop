const {Router} = require('express');

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


module.exports = router;
