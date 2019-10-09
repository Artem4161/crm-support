const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
  id: {
    type: Number,
    required: 'Id is required',
  },
  contents: {
    type: String,
    required: 'Contents is required',
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
  },
  date: {
    type: Date,
    required: 'Date is required',
  },
});

module.exports = model('Message', MessageSchema);
