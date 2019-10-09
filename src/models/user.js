const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    avatar: {
      type: String,
      default: '/img/default.jpg',
    },
    fullName: {
      type: String,
      required: 'Full name is required',
    },
    location: {
      type: String,
      required: 'Location is required',
    },
    phone: {
      type: String,
      required: 'Phone is required',
    },
    email: {
      type: String,
      required: 'Email is required',
    },
    credits: {
      type: Number,
      required: 'Credits is required',
    },
    money: {
      type: Number,
      required: 'Money is required',
    },
    vip: {
      type: Boolean,
      required: 'Vip is required',
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
    },
  },
);

module.exports = model('User', UserSchema);
