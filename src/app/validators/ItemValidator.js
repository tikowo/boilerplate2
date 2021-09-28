const Ajv = require('ajv');
const ajv = new Ajv();

module.exports = makeItemValidator = async ({ ItemCategory }) => {
    const categories = await ItemCategory.query().withGraphFetched('attributes.options');
    const validators = {};
    categories.forEach(category => {
        const _schema = {
            type: "object",
            properties: {},
            additionalProperties: false
        }

        category.attributes.forEach(attr => {
            let item;
            if (attr.value_type === 'enum') {
                if (attr.max_length > 1) {
                    item = {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            option_id: {
                                type: "array",
                                uniqueItems: true,
                                maxItems: attr.max_length,
                                items: {
                                    enum: attr.options.map(opt => opt.id)
                                }
                            }
                        }
                    }
                } else {
                    item = {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            option_id: {
                                enum: attr.options.map(opt => opt.id)
                            }
                        },
                    }
                }

            } else {
                item = {
                    type: "object",
                    properties: {
                        value: {
                            type: attr.value_type,
                            minLength: attr.min_length,
                            maxLength: attr.max_length
                        },
                    },
                    additionalProperties: false
                }
            }
            _schema.properties[attr.id] = item;
        });
        const _validate = ajv.compile(_schema);
        validators[category.id] = _validate;
    });

    return validators;
}