const mongoose = require('mongoose');
const logger = require('../components/logger');
const {
  mongodb: {
    user, pass, host, port, database,
  },
} = require('../config');
const {
  seedAdmin, seedTicket, seedUser, seedRole,
} = require('../seeds');
const {
  Admin, Ticket, User, Role,
} = require('../models');

global.DB = {};

exports.connectDatabase = async () => {
  const mongoUrl = `mongodb://${host}:${port}/${database}`;
  mongoose.Promise = global.Promise;
  mongoose.set('useFindAndModify', false);
  mongoose.connection
    .openUri(mongoUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      user,
      pass,
    })
    .once('open', async () => {
      logger.mongodb(`MongoDB connection established by ${mongoUrl}`);
      this.writeMockData();
    })
    .on('error', (error) => {
      logger.mongodb(`MongoDB connection failed ${mongoUrl}`, error);
    });
};

exports.writeMockData = async () => {
  const getRole = await Role.find({}).exec();
  const getAdmin = await Admin.find({}).exec();
  const getTicket = await Ticket.find({}).exec();
  const getUser = await User.find({}).exec();

  if (!getRole.length) {
    seedRole.forEach((role) => {
      new Role(role).save();
    });
  }

  if (!getAdmin.length) {
    seedAdmin.forEach((admin) => {
      new Admin(admin).save();
    });
  }

  if (!getUser.length) {
    new User(seedUser).save();
  }

  if (!getTicket.length) {
    seedTicket.forEach((ticket) => {
      new Ticket(ticket).save();
    });
  }
};
