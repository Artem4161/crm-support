const { Schema, model } = require('mongoose');

const TokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: 'User id is required',
    },
    token: {
      type: String,
      required: 'Token is required',
    },
    refreshToken: {
      type: String,
      required: 'Refresh token is required',
    },
    role: {
      type: String,
      required: 'Role is required',
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
    minimize: false,
  },
);

module.exports = model('Token', TokenSchema);
