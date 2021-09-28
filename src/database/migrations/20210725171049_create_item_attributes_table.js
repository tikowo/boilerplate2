
exports.up = function (knex) {
    return knex.schema.createTable('item_attributes', function (table) {
        table.engine('InnoDB');
        
        table.bigIncrements();
        table.bigInteger('item_id').unsigned().index().references('id').inTable('items').onDelete('CASCADE');
        table.bigInteger('attribute_id').unsigned().index().references('id').inTable('attributes').onDelete('CASCADE');
        table.bigInteger('option_id').unsigned().nullable();
        
        table.string('value').nullable();
        // table.string('value_type');

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('item_attributes');
};
