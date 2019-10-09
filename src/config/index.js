module.exports = {
  port: 3000,
  host: 'localhost',
  connection: './data',
  mongodb: {
    host: '127.0.0.1',
    database: 'support',
    port: 27017,
    user: '',
    pass: '',
  },
  jwt: {
    expiresIn: 365 * 24 * 60 * 60,
    secret: 'eclat_secret_jwt',
  },
  swagger: {
    definition: {
      swagger: '2.0',
      info: {
        title: 'VR',
        version: '1.0.0',
      },
    },
    apis: ['./src/modules/**/*.js'],
  },
};
