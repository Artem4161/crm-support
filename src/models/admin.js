const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.plugin(uniqueValidator);

const AdminSchema = new Schema({
  email: {
    type: String,
    unique: 'Admin with this email already exist',
    required: 'Email is required',
  },
  username: {
    type: String,
    required: 'User name is required',
  },
  password: {
    type: String,
    required: 'Password is required',
  },
  role: {
    type: String,
    required: 'Role is required',
  },
  avatar: {
    type: String,
    default: '/img/default.jpg',
  },
});

module.exports = model('Admin', AdminSchema);
