module.exports = makeItemRouter = ({ ExpressRouter, ItemController }) => {
    ExpressRouter.get('/', ItemController.index);

    ExpressRouter.get('/categories', ItemController.categories);
    ExpressRouter.get('/category/:id', ItemController.categoryAttributes);
    return ExpressRouter;
}