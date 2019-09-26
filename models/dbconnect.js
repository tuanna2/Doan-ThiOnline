const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '52.207.254.189',
      user : 'thionline',
      password : 'tundip',
      database : 'ThiOnline',
      // debug: ['ComQueryPacket']
    }
  });
module.exports = knex;