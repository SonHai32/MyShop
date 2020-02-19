const {Router} = require('express');
const Productions = require('../Models/Products') 
const router = Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: async(req, file, cb) =>{
        cb(null, 'Uploads/Images/Products');
    },
    filename: (req, file, cb) =>{
        cb(null, new Date().toISOString()+ "-" + file.originalname) 
    }
})

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpge' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const fileUpload = multer({storage: storage, 
    limit:{
        fileSize: 5*1024*1024
    },
    fileFilter: fileFilter
}).any();

router.get('/', async (req, res, next) =>{
    try{
        const productions = await Productions.find();
        res.json(productions)
    }catch(error){
        next(error)
    }
})


router.post('/', async (req, res, next) =>{
    try{
        fileUpload(req, res, (err) =>{
            if(err){
                console.log(err)
            }else{
                console.log(req.files[0].path)
            }
        })
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
