const makeErrorMiddleware = () => {
    return (err, req, res, next) => {
        // if (err.name === 'ValidationError') {
        //     return res.status(err.statusCode).json({ error: err });
        // }
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = makeErrorMiddleware;