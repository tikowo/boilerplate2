
exports.up = function (knex) {
    return knex.schema.createTable('items', function (table) {
        table.engine('InnoDB');

        table.bigIncrements();
        table.bigInteger('category_id').unsigned().index().references('id').inTable('item_categories').onDelete('CASCADE');
        table.bigInteger('market_id').unsigned().index().references('id').inTable('user_markets').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('items');
};
