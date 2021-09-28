
exports.up = function (knex) {
    return knex.schema.createTable('options_attributes', function (table) {
        table.engine('InnoDB');

        table.bigIncrements();

        table.bigInteger('option_id').unsigned().index().references('id').inTable('options').onDelete('CASCADE');
        table.bigInteger('attribute_id').unsigned().index().references('id').inTable('attributes').onDelete('CASCADE');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('options_attributes');
};
