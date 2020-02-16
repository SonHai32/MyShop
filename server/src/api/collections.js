const {Router} = require('express');

const collections = require('../Models/Collections')

const router = Router()


router.get('/', (req, res, next) =>{
    res.json({
        message: 'Catalogs'
    })
})

router.post('/', async (req, res, next) =>{
    try{
        const Collections = new collections(req.body);
        const createdCollection = await Collections.save();

        res.json({
            message: 'Collections created'
        })
    }catch(err){
        next(err)
    }
})


module.exports = router;
