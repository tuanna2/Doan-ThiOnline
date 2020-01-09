const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : 'tuantuan',
    database : 'ThiOnline',
    // debug: ['ComQueryPacket']
  }
});
module.exports = knex;