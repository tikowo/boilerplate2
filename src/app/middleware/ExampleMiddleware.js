const makeExampleMiddleware = () => {
    return (req, res, next) => {
        // Bind random stuff to req object
        req.middlewareBinding = {
            middleware: 'working',
            user_id: req.query.id || 1
        };

        return next();
    }
}

module.exports = makeExampleMiddleware;