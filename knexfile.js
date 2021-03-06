// Update with your config settings.
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host:  process.env.DB_HOST || 'localhost',
      user:  process.env.DB_USER || 'root',
      password:  process.env.DB_PASS || 'password',
      database:  process.env.DB_NAME || 'controleDeVendas',
      // timezone: 'utc'
    },
    migrations: {
      directory: './src/database/migrations'
    }
  },

  // production: {
  //   client: 'mysql',
  //   connection: {
  //     database: 'heroku_c50cc0114c4d07f',
  //     host: 'us-cdbr-east-03.cleardb.com',
  //     user: 'b870b775841c42',
  //     password: '5bfd5986',
  //     timezone: 'utc'

  //   },
  //   migrations: {
  //     directory: './src/database/migrations'
  //   }
  // },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST ,
      user: process.env.DB_USER ,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME ,
      
      timezone: 'utc'

    },
    migrations: {
      directory: './src/database/migrations'
    }
  },
};
