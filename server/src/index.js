const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const middlewares = require('./middlewares')
const logs = require('./api/logs.js')
require('dotenv').config();


const app = express();

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}, error =>{
    console.log(error)
});


app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use(express.json())
app.get('/', (req, res) =>{
    res.json({
        message: 'Hello'
    })
})

app.use('/api/logs', logs)
app.use(middlewares.notFound);
app.use(middlewares.errorHandle)

const port = process.env.PORT || 1337;

app.listen(port, () =>{
    console.log(`listen at port ${port}`)
})
