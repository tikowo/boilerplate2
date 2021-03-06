const BaseModel = require('./BaseModel');

class User extends BaseModel {
    get hidden() {
        return ['password'];
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email', 'password'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', minLength: 1, maxLength: 255, format: 'email' },
                password: { type: 'string', minLength: 1, maxLength: 255 }
            }
        };
    }

    get elasticSearchable() {
        return ['users', this, this.id]
    }

    static get relationMappings() {
        return {
            markets: {
                relation: BaseModel.HasManyRelation,
                modelClass: 'UserMarket',
                join: {
                    from: 'users.id',
                    to: 'user_markets.user_id'
                }
            }
        }
    }

}

module.exports = User;