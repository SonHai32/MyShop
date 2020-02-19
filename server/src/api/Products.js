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
        fileSize: 5 * 1024 * 1024
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


router.post('/', (req, res, next) =>{
        fileUpload(req, res, async (err) =>{
            if(err){
                next(err)
            }else{
                
                try{

                    let imagePaths = [];
                    req.files.forEach(file =>{
                        imagePaths.push(file.path)
                    })

                    const Production = new Productions({                
                    name: req.body.name,
                    productId: req.body.productId,
                    collectionId: req.body.collectionId,
                    price: req.body.price,
                    discount: req.body.discount,
                    image_link: imagePaths[0],
                    image_list: imagePaths,
                    view: req.body.view
                    })

                    const createdProduction = await Production.save();
                    res.json({
                        message: "created",
                        ...createdProduction
                    })
                }catch(err){
                    res.json({
                        name: err.name,
                        message: err._message
                    })
                    next(err)
                }
                
            }
        }) 
})

module.exports = router;
