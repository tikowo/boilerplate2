const makeMarketController = ({ Controller, UserMarket, ItemService }) => {
    return Controller({
        async create(req, res, next) {
            const marketName = req.body.name;
            const authId = (await req.auth()).id;
            //TODO insertGraph with item
            const market = await UserMarket.query().insert({
                name: marketName,
                logo: 'https://auto.am/assets/ico/fi/favicon-32x32.png',
                user_id: authId
            });

            res.json(market);
        },

        async magic(req, res, next) {
            //TODO rewrite
            const authId = (await req.auth()).id;
            // validate that market exists
            let market = await UserMarket.query().withGraphFetched('item').where({ id: req.params.id, user_id: authId }).first();

            if (!market) {
                throw new Error('Bad request');
            }

            if (!market.item) {
                await UserMarket.relatedQuery('item').for(market.id).insert({
                    category_id: 4
                });
                market = await market.$query().withGraphFetched('item');
            }

            const data = await ItemService.insertItemAttributes(req.body, market.item);
            market.$afterInsert();
            return res.json(data);
        },

        async marketProducts(req, res, next) {
            const products = await UserMarket.relatedQuery('products').withItem().for(req.params.id)
            res.json(products)
        }
    })
}

module.exports = makeMarketController;