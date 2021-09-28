const faker = require('faker');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('item_categories').del()
    .then(async function () {
      // Inserts seed entries
      await knex('attributes').insert([
        {
          name: 'model',
          value_type: 'string',
          min_length: '1',
          max_length: '255'
        },
        {
          name: 'color',
          value_type: 'enum',
          min_length: '1',
          max_length: '255'
        },
        {
          name: 'email',
          value_type: 'string',
          min_length: '1',
          max_length: '255',
          format: 'email'
        }
      ])

      await knex('item_categories').insert([
        { id: 1, name: 'electronics' },
        { id: 2, parent_id: 1, name: 'phones' },
        { id: 3, parent_id: 2, name: 'Iphones' }
      ]);

      await knex('attributes_categories').insert([
        { attribute_id: 1, category_id: 3 },
        { attribute_id: 2, category_id: 3 },
        { attribute_id: 3, category_id: 3 }
      ]);

      let items = [];
      let attributes = [];
      for(let i = 1; i < 400; i++) {
        items.push({
          id: i,
          category_id: faker.datatype.number({min: 1, max: 3}),
          market_id: 1
        })

        attributes.push({
            item_id: i,
            value: "Asdf",
            attribute_id: 1
        })
        attributes.push({
            item_id: i,
            value: "fdsa",
            attribute_id: 2
        })
      }
      await knex('items').insert(items)
      await knex('item_attributes').insert(attributes);

      await knex('options').insert([{value: 'blue'}])
      await knex('options_attributes').insert([{option_id: 1, attribute_id: 2}]);
      return;
      

      await knex('item_attributes').insert([
        {
          value: "Blue",
          item_id: 1,
          attribute_id: 1
        },
        {
          value: "Esim",
          item_id: 1,
          attribute_id: 2
        }
      ])
    });
};
