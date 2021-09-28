
exports.up = function (knex) {
    return knex.schema.createTable('item_categories', function (table) {
        table.engine('InnoDB');

        table.bigIncrements();
        table.bigInteger('parent_id')
             .unsigned()
             .index()
             .references('id')
             .inTable('item_categories')
             .onDelete('SET NULL');
        
        table.string('name');
        table.string('key');
        table.string('slug');
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('item_categories');
};
