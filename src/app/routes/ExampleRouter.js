module.exports = makeExampleRouter = ({ ExpressRouter, ExampleMiddleware, ExampleController }) => {
    ExpressRouter.get('/mysql', ExampleMiddleware, ExampleController.index)
    ExpressRouter.get('/elastic', ExampleMiddleware, ExampleController.findElastic)
    ExpressRouter.post('/', ExampleController.store);
    
    return ExpressRouter;
}