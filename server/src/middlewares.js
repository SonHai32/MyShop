const notFound = (req, res, next)  =>{
    const error = new Error(`Not Found ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandle = (error, req, res, next) =>{
    const statusCode = res.statusCode === 500 ? 200 : res.statusCode;
    res.status(statusCode);
    next({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🙈' : error.stack 
    })
}

module.exports = {
    notFound,
    errorHandle
}
