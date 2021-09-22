module.exports = makeSecondRouter = ({ ExpressRouter }) => {
    ExpressRouter.get('/second', (req, res, next) => {
        res.json({ hi: true })
    });

    return ExpressRouter;
}