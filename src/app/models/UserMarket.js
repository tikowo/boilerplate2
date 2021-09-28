const BaseModel = require('./BaseModel');

class UserMarket extends BaseModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'icon', 'user_id'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'icon', minLength: 1, maxLength: 255 },
                user_id: { type: 'integer' }
            }
        };
    }

    get elasticSearchable() {
        return ['user_markets', this, this.id]
    }

    static get relationMappings() {
        return {
            products: {
                relation: BaseModel.HasManyRelation,
                modelClass: 'Item',
                join: {
                    from: 'user_markets.id',
                    to: 'items.market_id'
                }
            }
        }
    }

}

module.exports = UserMarket;