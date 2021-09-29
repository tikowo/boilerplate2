const BaseModel = require('./BaseModel');

class Product extends BaseModel {
    get elasticSearchable() {
        const data = async () => await Product.query().withItem().findById(this.id);
        return ['products', data, this.id]
    }

    static get relationMappings() {
        return {
            item: {
                relation: BaseModel.HasOneRelation,
                modelClass: "Item",
                filter(builder) {
                    builder.where('item_type', 'Product')
                },
                beforeInsert(model) {
                    model.item_type = 'Product'
                },
                join: {
                    from: "products.id",
                    to: "items.item_id"
                }
            },
        }
    }

}

module.exports = Product;