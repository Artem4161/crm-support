const { hashSync } = require('bcryptjs');

module.exports = [
  {
    role: '5d7a35358660eb0c988ffbcd',
    username: 'Roman',
    password: hashSync('111111'),
    email: 'support@gmail.com',
  },
  {
    role: '5d7a35358660eb0c988ffbce',
    username: 'Dmitriy',
    password: hashSync('222222'),
    email: 'supportManager@gmail.com',
  },
];
