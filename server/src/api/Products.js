const {Router} = require('express');
const Productions = require('../Models/Products') 
const router = Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './Uploads');
    },
    filename: (req, file, cb) =>{
        cb(null, new Date().toISOString() + file.originalname) 
    }
})
const photoUpload = multer({storage: storage})


router.get('/', async (req, res, next) =>{
    try{
        const productions = await Productions.find();
        res.json(productions)
    }catch(error){
        next(error)
    }
    

})

router.post('/', photoUpload.array('photo', 3), async (req, res, next) =>{
    try{    
        res.json(req.file)
        //const Production = new Productions(req.body);
        //const createdProduction = await Production.save();  
        //res.json({
          //  message: 'created'
        //})
    }catch(error){
        res.json(error)
        next(error)
    }
})

module.exports = router;
