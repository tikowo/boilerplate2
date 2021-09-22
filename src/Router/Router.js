module.exports = makeRouter = ({ ExpressRouter, TestRoutes, SecondRouter }) => {
    ExpressRouter.use('/test', TestRoutes);
    ExpressRouter.use('/second', SecondRouter);

    return ExpressRouter;
}