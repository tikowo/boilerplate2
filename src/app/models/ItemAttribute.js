const BaseModel = require('./BaseModel');

class ItemAttribute extends BaseModel {
    get hidden() {
        return ['created_at', 'updated_at']
    }
    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: { type: 'integer' },
                item_id: { type: 'integer' },
                attribute_id: { type: 'integer' },
                option_id: { type: 'integer' },
                // value: { type: 'string' }
            }
        };
    }

    static get relationMappings() {
        return {
            attribute: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: 'Attribute',
                join: {
                    from: 'item_attributes.attribute_id',
                    to: 'attributes.id'
                }
            },
            option: {
                relation: BaseModel.HasOneRelation,
                modelClass: "Option",
                join: {
                    from: "item_attributes.option_id",
                    to: "options.id"
                }
            }
        }
    }
}

module.exports = ItemAttribute;
