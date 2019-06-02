const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'heroku_19229d7d55e8896',
      user : 'bd717293221bab',
      password : '9a96ac84',
      database : 'heroku_19229d7d55e8896',
      // debug: ['ComQueryPacket']
    }
  });
module.exports = knex;