module.exports = makeExampleRouter = ({ ExpressRouter, AuthMiddleware, AuthController }) => {
    ExpressRouter.post('/login', AuthController.login)
    ExpressRouter.post('/register', AuthController.register)
    ExpressRouter.get('/me', AuthMiddleware, AuthController.me );

    return ExpressRouter;
}