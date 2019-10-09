const Ticket = require('../models/ticket.js');
const CheckService = require('./privilege');

class TicketService {
  async list(req) {
    const {
      count = 20,
      page = 1,
      date,
      search,
      issueType,
      status,
      priority,
      sortField,
      sortType,
      arrayFields,
    } = req.body;
    const { roleData } = req;
    const objFields = {};
    const findReq = {};

    for (let i = 0; i < arrayFields.length; ++i) {
      objFields[arrayFields[i]] = 1;
    }

    if (date) {
      findReq.createdAt = {
        $lte: new Date(date),
        $gte: new Date(new Date().setDate(new Date(date).getDate() - 1)),
      };
    }

    if (search) {
      findReq.subject = { $regex: String(search), $options: 'i' };
    }

    if (issueType && issueType.length > 0) {
      findReq.issueType = issueType;
    }

    if (status && status.length > 0) {
      findReq.status = status;
    }

    if (priority && priority.length > 0) {
      findReq.priority = priority;
    }

    if (!roleData.privilege.archivedTickets) {
      findReq.status = 'open';
    }

    Logger.mongodb('Get list ticket', findReq);
    const total = await Ticket.find()
      .countDocuments();
    const list = await Ticket.find(findReq, objFields)
      .sort({ [sortField]: +sortType })
      .skip(page > 0 ? ((page - 1) * +count) : 0)
      .limit(+count)
      .populate('postedBy')
      .populate('reservedBy');

    return { list, total };
  }

  async find({ id }) {
    Logger.mongodb('Find ticket', { id });
    const ticket = await Ticket.findOne({ _id: id })
      .populate('postedBy')
      .populate('reservedBy')
      .exec();
    return ticket;
  }

  async reserve(req) {
    const { params, user } = req;
    Logger.mongodb('Reserve ticket');
    await Ticket.findOneAndUpdate({ _id: params.id }, { reservedBy: user._id });
  }

  async update(req) {
    const { body, user } = req;

    await CheckService.canUpdateTicket(req);

    Logger.mongodb('Update ticket');
    await Ticket.findOneAndUpdate(
      { _id: body.id },
      {
        status: body.status,
        updatedInfo: {
          updatedBy: user._id,
          updatedValue: body.status,
          updatedTime: new Date(),
        },
      },
    );
  }

  async message(req) {
    const { body, user } = req;

    await CheckService.canUpdateTicket(req);

    Logger.mongodb('Send message');
    await Ticket.findOneAndUpdate(
      { _id: body.id },
      {
        $push: {
          feed: {
            id: body.senderId,
            contents: body.contents,
            sender: user._id,
            date: new Date(),
          },
        },
      },
    );
  }
}

module.exports = new TicketService();
