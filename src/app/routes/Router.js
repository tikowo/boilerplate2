module.exports = makeRouter = (
    {
        ErrorMiddleware,
        ExpressRouter,
        ExampleRouter,
        AuthRouter,
        ItemRouter,
        MarketRouter
    }) => {

    ExpressRouter.use('/example', ExampleRouter);
    ExpressRouter.use('/auth', AuthRouter);
    ExpressRouter.use('/items', ItemRouter);

    ExpressRouter.use('/market', MarketRouter);

    ExpressRouter.use(ErrorMiddleware);

    return ExpressRouter;
}