module.exports = makeItemService = ({ ItemValidator, Item }) => {
    return {
        async insertItemAttributes(data, item) {
            const { id, category_id } = item;

            if(!id || !category_id) {
                throw new Error('item.id and item.category_id is required')
            }

            const validator = (await ItemValidator)[category_id];
            const valid = validator(data);

            if(!valid) {
                throw new Error('Invalid data');
            }

            const _ids = Object.keys(data).map(i => Number(i));
            const _items = [];
            _ids.forEach(id => {
                let keyAttr = data[id].value ? 'value' : 'option_id';
                if (Array.isArray(data[id][keyAttr])) {
                    data[id][keyAttr].forEach(value => {
                        _items.push({
                            attribute_id: id,
                            [keyAttr]: value
                        })
                    });
                    return;
                }
                _items.push({
                    attribute_id: id,
                    [keyAttr]: data[id][keyAttr]
                })
            })
            await Item.relatedQuery('attributes').for(id).delete().whereIn('attribute_id', _ids);
            const savedAttributes = await Item.relatedQuery('attributes').for(item.id).insertGraph([
                ..._items
            ])

            return savedAttributes;
        }
    }
}