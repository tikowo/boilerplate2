module.exports = makeMarketRouter = ({ ExpressRouter, AuthMiddleware, MarketController }) => {
    ExpressRouter.post('/create', AuthMiddleware, MarketController.create);
    ExpressRouter.post('/magic/:id', AuthMiddleware, MarketController.magic);
    ExpressRouter.get('/:id/products', AuthMiddleware, MarketController.marketProducts)
    // ExpressRouter.post('/:id/product', AuthMiddleware, MarketController.addProduct);

    return ExpressRouter;
}