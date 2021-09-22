module.exports = makeTestRoutes = ({ ExpressRouter }) => {
    ExpressRouter.get('/hi', (req, res, next) => {
        res.json({ hi: true })
    });

    return ExpressRouter;
}