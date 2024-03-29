const errorHandler = (err, req, res, next) => {
    const statusCode = req.status ? req.status : 500;

    res.status(statusCode);

    res.json({
        message : err.message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack
    })
}
export default errorHandler;