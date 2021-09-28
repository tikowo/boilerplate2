module.exports = makeMarketRouter = ({ ExpressRouter, AuthMiddleware, MarketController }) => {
    ExpressRouter.post('/create', AuthMiddleware, MarketController.create);
    ExpressRouter.post('/magic/:id', AuthMiddleware, MarketController.magic);

    return ExpressRouter;
}