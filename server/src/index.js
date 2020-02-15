const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares')
const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/', (req, res) =>{
    res.json({
        message: 'Hello'
    })
})

app.use(middlewares.notFound);
app.use(middlewares.errorHandle)

const port = process.env.PORT || 1337;

app.listen(port, () =>{
    console.log(`listen at port ${port}`)
})
