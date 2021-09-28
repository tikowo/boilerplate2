const BaseModel = require('./BaseModel');

class ItemCategory extends BaseModel {
    get hidden() {
        return ['created_at', 'updated_at']
    }
    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                key: { type: 'string', minLength: 1, maxLength: 255 },
                slug: { type: 'string', minLength: 1, maxLength: 255 },
                parent_id: { type: 'integer' }
            }
        };
    }

    static get relationMappings() {
        return {
            attributes: {
                relation: BaseModel.ManyToManyRelation,
                modelClass: 'Attribute',
                join: {
                    from: 'item_categories.id',
                    through: {
                        from: 'attributes_categories.category_id',
                        to: 'attributes_categories.attribute_id'
                    },
                    to: 'attributes.id'
                }
            },
            parent: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: 'ItemCategory',
                join: {
                    from: 'item_categories.parent_id',
                    to: 'item_categories.id'
                }
            },
            children: {
                relation: BaseModel.HasManyRelation,
                modelClass: 'ItemCategory',
                join: {
                    from: 'item_categories.id',
                    to: 'item_categories.parent_id'
                }
            }
        }
    }
}

module.exports = ItemCategory;
