const makeItemController = ({ Controller, Item, UserMarket, Product }) => {
    return Controller({
        async index(req, res, next) {
            const market = await UserMarket.query().withGraphFetched('[products.item, item.[attributes.[attribute, option]]]');
            // const prod = await Product.query().withGraphFetched('item');
            return res.send(market);
            // const category = Number(req.query.category ?? 0);
            //
            // let q = Item.query()
            //     .withGraphFetched('[category.[attributes, children.^3], attributes.[attribute, option]]')
            //     .page(1, 20);
            //
            // if (category) {
            //     q = q.where('category_id', category);
            // }
            //
            // const data = await q;
            // // data.results = data.results.map(item => item.formattedAttributes)
            // return res.send(data);
        }
    });
}

module.exports = makeItemController;