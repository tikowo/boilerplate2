
exports.up = function(knex) {
    return knex.schema.createTable('products', function(table) {
        table.engine('InnoDB');

        // TODO maybe like products who knows
        table.bigIncrements();
        table.bigInteger('market_id').unsigned().index().references('id').inTable('user_markets').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};