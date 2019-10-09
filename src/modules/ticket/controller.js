/* eslint-disable no-useless-constructor */
const BaseComponent = require('../../components/base');
const TicketService = require('../../services/ticket');

class TicketController extends BaseComponent {
  constructor() {
    super();
  }

  async list(req, res) {
    try {
      const content = await TicketService.list(req);
      return super.sendResponse(res, content, 'Get ticket list.');
    } catch (error) {
      return super.sendError(res, 401, error, 'Get ticket list failed.');
    }
  }

  async find(req, res) {
    try {
      const content = await TicketService.find(req.params);
      return super.sendResponse(res, content, 'Get ticket.');
    } catch (error) {
      return super.sendError(res, 401, error, 'Get ticket failed.');
    }
  }

  async reserve(req, res) {
    try {
      const content = await TicketService.reserve(req);
      return super.sendResponse(res, content, 'Reserve ticket.');
    } catch (error) {
      return super.sendError(res, 401, error, 'Reserve failed.');
    }
  }

  async update(req, res) {
    try {
      const content = await TicketService.update(req);
      return super.sendResponse(res, content, 'Update ticket.');
    } catch (error) {
      return super.sendError(res, 401, error, 'Update ticket failed.');
    }
  }

  async message(req, res) {
    try {
      const content = await TicketService.message(req);
      return super.sendResponse(res, content, 'Message ticket.');
    } catch (error) {
      return super.sendError(res, 401, error, 'Message failed.');
    }
  }
}
module.exports = new TicketController();
