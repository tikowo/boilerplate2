
exports.up = function (knex) {
    return knex.schema.createTable('attributes_categories', function (table) {
        table.engine('InnoDB');

        table.bigIncrements();
        table.bigInteger('category_id').unsigned().index().references('id').inTable('item_categories').onDelete('CASCADE');
        table.bigInteger('attribute_id').unsigned().index().references('id').inTable('attributes').onDelete('CASCADE');

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('attributes_categories');
};
