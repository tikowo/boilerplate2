
exports.up = function (knex) {
    return knex.schema.createTable('options', function (table) {
        table.engine('InnoDB');

        table.bigIncrements();
        table.string('value');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('options');
};
