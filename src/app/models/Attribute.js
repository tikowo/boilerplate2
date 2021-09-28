const BaseModel = require('./BaseModel');

class Attribute extends BaseModel {
    get hidden() {
        return ['created_at', 'updated_at']
    }
    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                value_type: { type: 'string' }
            }
        };
    }

    static get relationMappings() {
        return {
            options: {
                relation: BaseModel.ManyToManyRelation,
                modelClass: 'Option',
                join: {
                    from: 'attributes.id',
                    through: {
                        from: 'options_attributes.attribute_id',
                        to: 'options_attributes.option_id'
                    },
                    to: 'options.id'
                }
            }
        }
    }
}

module.exports = Attribute;
