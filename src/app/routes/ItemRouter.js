module.exports = makeItemRouter = ({ ExpressRouter, ItemController }) => {
    ExpressRouter.get('/', ItemController.index);
    
    return ExpressRouter;
}