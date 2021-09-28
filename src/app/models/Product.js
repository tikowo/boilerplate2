const BaseModel = require('./BaseModel');

class Product extends BaseModel {
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