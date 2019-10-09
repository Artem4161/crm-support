const Ticket = require('../models/ticket.js');

class CheckService {
  async canUpdateTicket(req) {
    const { body, user, roleData } = req;
    const ticket = await Ticket.findOne({ _id: body.id });

    if (!ticket.reservedBy) {
      if (!roleData.privilege.archivedTickets) {
        throw new Error();
      }
      return;
    }

    if (
      !roleData.privilege.archivedTickets
      && (String(user._id) !== String(ticket.reservedBy._id))
    ) {
      throw new Error();
    }
  }
}

module.exports = new CheckService();
