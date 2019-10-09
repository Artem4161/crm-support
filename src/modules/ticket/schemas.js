module.exports.getListTicket = {
  type: 'object',
  properties: {
    page: {
      type: 'number',
    },
    count: {
      type: 'number',
    },
    issueType: {
      type: 'string',
      enum: ['general', 'billing', 'technical'],
    },
    status: {
      type: 'string',
      enum: ['open', 'close'],
    },
    priority: {
      type: 'string',
      enum: ['high', 'medium', 'low'],
    },
    sortField: {
      type: 'string',
    },
    sortType: {
      type: 'number',
    },
    date: {
      type: 'string',
    },
    arrayFields: {
      type: 'array',
    },
  },
  required: ['page', 'count', 'arrayFields'],
};

module.exports.updateTicket = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: ['open', 'close'],
    },
  },
  required: ['id', 'status'],
};

module.exports.message = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    senderId: {
      type: 'number',
    },
    contents: {
      type: 'string',
      minLength: 2,
      maxLength: 64,
    },
  },
  required: ['id', 'senderId', 'contents'],
};
