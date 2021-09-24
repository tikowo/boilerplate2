module.exports = makeRouter = ({ ExpressRouter, ExampleRouter, AuthRouter }) => {
    ExpressRouter.use('/example', ExampleRouter);
    ExpressRouter.use('/auth', AuthRouter);

    return ExpressRouter;
}