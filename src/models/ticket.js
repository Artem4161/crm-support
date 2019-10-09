const { Schema, model } = require('mongoose');

const TicketSchema = new Schema(
  {
    ticketId: {
      type: String,
      required: 'Ticket id is required',
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    subject: {
      type: String,
      required: 'Subject is required',
    },
    text: {
      type: String,
      required: 'Text is required',
    },
    issueType: {
      type: String,
      lowercase: true,
      enum: ['general', 'billing', 'technical'],
      default: 'general',
    },
    status: {
      type: String,
      lowercase: true,
      enum: ['open', 'close'],
      default: 'open',
    },
    reservedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    priority: {
      type: String,
      lowercase: true,
      enum: ['high', 'medium', 'low'],
      default: 'low',
    },
    updatedInfo: {
      type: Object,
    },
    feed: ['Message'],
  },
  {
    timestamps: {
      createdAt: 'createdAt',
    },
  },
);

module.exports = model('Ticket', TicketSchema);
