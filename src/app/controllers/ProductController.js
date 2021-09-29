const makeProductController = ({ Controller, UserMarket, Product, ItemValidator, Item, ItemService }) => {
    return Controller({
        async create(req, res, next) {
            //TODO validate ownership
            //TODO separate controller for products
            const product = await UserMarket.relatedQuery('products').for(req.body.market_id).insertGraph({
                item: {
                    category_id: 4
                }
            })
            res.json({ product })
        },
        async editProductAttributes(req, res, next) {
            const productId = req.params.id;
            const product = await Product.query().withGraphFetched('item').findById(productId);

            const data = await ItemService.insertItemAttributes(req.body, product.item);
            product.$afterInsert();

            res.json(data);
        }
    })
}

module.exports = makeProductController;