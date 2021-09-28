module.exports = makeRouter = ({ ErrorMiddleware, ExpressRouter, ExampleRouter, AuthRouter, ItemRouter }) => {
    ExpressRouter.use('/example', ExampleRouter);
    ExpressRouter.use('/auth', AuthRouter);
    ExpressRouter.use('/items', ItemRouter)
    ExpressRouter.use(ErrorMiddleware);

    return ExpressRouter;
}