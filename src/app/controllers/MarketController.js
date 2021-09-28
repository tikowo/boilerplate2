const makeMarketController = ({ Controller, UserMarket, Item, ItemValidator }) => {
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
        },

        async magic(req, res, next) {
            const authId = (await req.auth()).id;

            // validate that market exists
            const market = await UserMarket.query().withGraphFetched('item').where({ id: req.params.id, user_id: authId }).first();
            if (!market) {
                throw new Error('Bad request');
            }

            if (!market.item) {
                // todo validate
                const category = req.body.category;
                await UserMarket.relatedQuery('item').for(market.id).insert({
                    category_id: category
                });
            }
            const itemValidator = (await ItemValidator)[market.item.category_id];
            const valid = itemValidator(req.body);
            const errors = itemValidator.errors;

            if (!valid) {
                throw new Error('invalid');
            }

            const _ids = Object.keys(req.body).map(i => Number(i));
            const _items = [];
            _ids.forEach(id => {
                let keyAttr = req.body[id].value ? 'value' : 'option_id';
                if (Array.isArray(req.body[id][keyAttr])) {
                    req.body[id][keyAttr].forEach(value => {
                        _items.push({
                            attribute_id: id,
                            [keyAttr]: value
                        })
                    });
                    return;
                }
                _items.push({
                    attribute_id: id,
                    [keyAttr]: req.body[id][keyAttr]
                })
            })

            await Item.relatedQuery('attributes').for(market.item.id).delete().whereIn('attribute_id', _ids);
            const savedAttributes = await Item.relatedQuery('attributes').for(market.item.id).insertGraph([
                ..._items
            ])
            res.json(savedAttributes)
        }
    })
}

module.exports = makeMarketController;