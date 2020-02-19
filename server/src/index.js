const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

require('dotenv').config();

const middlewares = require('./middlewares')


const products = require('./api/Products')
const collections = require('./api/collections.js')
const users = require('./api/Users.js')



mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}, error =>{
    if(error){
        console.log(error)
    }
});


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('common'));
app.use(helmet());
app.use('/uploads', express.static('uploads'))
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use(express.json())
app.get('/', (req, res) =>{
    res.json({
        message: 'Hello'
    })
})

app.use('/api/Products', products)
app.use('/api/Collections', collections)
app.use('/api/Users', users)

app.use(middlewares.notFound);
app.use(middlewares.errorHandle)

const port = process.env.PORT || 1337;

app.listen(port, () =>{
    console.log(`listen at port ${port}`)
})
