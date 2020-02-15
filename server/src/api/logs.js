const {Router} = require('express');
const LogProductions = require('../Models/LogProduct') 
const router = Router();

router.get('/', (req, res) =>{
    res.json({
        message: 'hello api'
    })
})

router.post('/', async (req, res, next) =>{
    try{
        const logProduction = new LogProductions(req.body);
        const createdProduction = await logProduction.save(); 
        
        res.json(createdProduction)
    }catch(error){
        next(error)
    }
})

module.exports = router;
