const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({
  name: {
    type: String,
    required: 'Name is required',
  },
  privilege: {
    type: Object,
    required: 'Privilege is required',
  },
});

module.exports = model('Role', RoleSchema);
