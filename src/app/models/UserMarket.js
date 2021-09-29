const BaseModel = require('./BaseModel');

class UserMarket extends BaseModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'logo', 'user_id'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                logo: { type: 'string', minLength: 1, maxLength: 255 },
                user_id: { type: 'integer' }
            }
        };
    }

    get elasticSearchable() {
        const data = async () => await UserMarket.query().withGraphFetched('[item.[attributes.[attribute, option]]]').findById(this.id);
        return ['user_markets', data, this.id]
    }

    static get relationMappings() {
        return {
            item: {
                relation: BaseModel.HasOneRelation,
                modelClass: "Item",
                filter(builder) {
                    builder.where('item_type', 'UserMarket')
                },
                beforeInsert(model) {
                    model.item_type = 'UserMarket'
                },
                join: {
                    from: "user_markets.id",
                    to: "items.item_id"
                }
            },
            products: {
                relation: BaseModel.HasManyRelation,
                modelClass: 'Product',
                join: {
                    from: 'user_markets.id',
                    to: 'products.market_id'
                }
            }
        }
    }

}

module.exports = UserMarket;