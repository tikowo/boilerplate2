module.exports = makeMarketRouter = ({ ExpressRouter, AuthMiddleware, MarketController }) => {
    ExpressRouter.post('/create', AuthMiddleware, MarketController.create)

    return ExpressRouter;
}