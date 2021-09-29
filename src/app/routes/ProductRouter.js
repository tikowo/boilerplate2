module.exports = makeProductRouter = ({ ExpressRouter, AuthMiddleware, ProductController }) => {
    ExpressRouter.post('/create', AuthMiddleware, ProductController.create);
    ExpressRouter.post('/edit/:id', AuthMiddleware, ProductController.editProductAttributes);
    return ExpressRouter;
}