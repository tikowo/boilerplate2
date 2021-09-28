
exports.up = function (knex) {
    return knex.schema.createTable('attributes', function (table) {
        table.engine('InnoDB');

        table.bigIncrements();
        table.string('name');
        table.string('value_type');
        table.integer('min_length');
        table.integer('max_length');
        table.string('format');

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('attributes');
};
