const router = require('express').Router();
const TicketController = require('./controller');
const { check, validate } = require('../../middlewares');
const getListTicket = require('./schemas');
const updateTicket = require('./schemas');
const message = require('./schemas');

/**
 * @swagger
 * /v1/ticket/list:
 *   post:
 *     tags:
 *       - Tickets
 *     description: get list ticket
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: "object"
 *           required:
 *             - "page"
 *             - "count"
 *           properties:
 *             page:
 *               type: number
 *             count:
 *               type: number
 *             issueType:
 *               type: string
 *             status:
 *               type: string
 *             priority:
 *               type: string
 *             sortField:
 *               type: string
 *             sortType:
 *               type: string
 *             date:
 *               type: date
 *     responses:
 *       200:
 *         description: "successful"
 *       422:
 *         description: "error"
 */
router.post(
  '/list',
  check.auth(),
  check.role(),
  check.permission('ticketsList'),
  validate.validateSchema(getListTicket),
  TicketController.list,
);
/**
 * @swagger
 * /v1/ticket/ticket:
 *   get:
 *     tags:
 *       - Tickets
 *     description: Get ticket
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: header
 *     responses:
 *       200:
 *         description: "Send user data"
 *       401:
 *         description: ""
 */
router.get(
  '/ticket/:id',
  check.auth(),
  check.role(),
  check.permission('ticketsList'),
  TicketController.find,
);
/**
 * @swagger
 * /v1/ticket/reserve:
 *   get:
 *     tags:
 *       - Tickets
 *     description: Reserve ticket
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: header
 *     responses:
 *       200:
 *         description: "Send user data"
 *       401:
 *         description: ""
 */
router.get(
  '/reserve/:id',
  check.auth(),
  check.role(),
  check.permission('ticketsList'),
  TicketController.reserve,
);
/**
 * @swagger
 * /v1/ticket/update:
 *   post:
 *     tags:
 *       - Tickets
 *     description: update ticket
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: "object"
 *           required:
 *             - "id"
 *             - "status"
 *           properties:
 *             status:
 *               type: string
 *     responses:
 *       200:
 *         description: "successful"
 *       422:
 *         description: "error"
 */
router.post(
  '/update',
  check.auth(),
  check.role(),
  check.permission('ticketsList'),
  validate.validateSchema(updateTicket),
  TicketController.update,
);
/**
 * @swagger
 * /v1/ticket/message:
 *   post:
 *     tags:
 *       - Tickets
 *     description: message ticket
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: "object"
 *           required:
 *             - "contents"
 *           properties:
 *             status:
 *               type: string
 *     responses:
 *       200:
 *         description: "successful"
 *       422:
 *         description: "error"
 */
router.post(
  '/message',
  check.auth(),
  check.role(),
  check.permission('ticketsList'),
  validate.validateSchema(message),
  TicketController.message,
);


module.exports = router;
