const BaseModel = require('./BaseModel');

class Item extends BaseModel {
    get elasticSearchable() {
        // TODO this -> funciton that calls db or some other stuff idk
        return ['items', this];
    }

    static get virtualAttributes() {
        return ['formattedAttributes'];
    }

    get hidden() {
        return ['created_at', 'updated_at']
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: { type: 'integer' },
                category_id: { type: 'integer' }
            }
        };
    }

    get formattedAttributes() {
        const obj = {};
        if (!this.attributes) return {};
        this.attributes.forEach(attr => {
            if (!attr.attribute) return;
            if (attr.option) {
                attr.value = attr.option.value;

                if (attr.attribute.max_length > 1) {
                    Array.isArray(obj[attr.attribute.name]) ? obj[attr.attribute.name].push(attr.value) : obj[attr.attribute.name] = [attr.value];
                    return;
                }
            }
            obj[attr.attribute.name] = attr.value;
        });
        return obj;
    }

    static get relationMappings() {
        return {
            category: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: 'ItemCategory',
                join: {
                    from: 'items.category_id',
                    to: 'item_categories.id'
                }
            },
            attributes: {
                relation: BaseModel.HasManyRelation,
                modelClass: 'ItemAttribute',
                join: {
                    from: 'items.id',
                    to: 'item_attributes.item_id'
                }
            }
        }
    }
}

module.exports = Item;
