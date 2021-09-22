module.exports = makeRouter = ({ ExpressRouter, ExampleRouter }) => {
    ExpressRouter.use('/example', ExampleRouter);
    
    return ExpressRouter;
}