const makeMarketController = ({ Controller, UserMarket }) => {
    return Controller({
        async create(req, res, next) {
            const marketName = req.body.name;
            const authId = (await req.auth()).id;
            const market = await UserMarket.query().insert({
                name: marketName,
                logo: 'https://auto.am/assets/ico/fi/favicon-32x32.png',
                user_id: authId
            });
            res.json(market);
        }
    })
}

module.exports = makeMarketController;