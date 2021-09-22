const faker = require('faker');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        },
      ]);
    });
};