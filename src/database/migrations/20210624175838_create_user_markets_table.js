
exports.up = function(knex) {
    return knex.schema.createTable('user_markets', function(table) {
        table.engine('InnoDB');

        // TODO maybe like products who knows
        table.bigIncrements();
        table.string('name').notNullable();
        table.string('logo');
        table.bigInteger('user_id').unsigned().index().references('id').inTable('users').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('user_markets');
};