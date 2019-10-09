const router = require('express').Router();
const Auth = require('../modules/auth/route');
const Ticket = require('../modules/ticket/route');
const {
  allowHeadersHandler,
  errorHandler,
  notFoundHandler,
} = require('./common');

router.all('*', allowHeadersHandler);
router.options('*', (req, res) => {
  res.status(200);
  res.json();
});
router.use('/v1/auth', Auth);
router.use('/v1/ticket', Ticket);
router.use(errorHandler);
router.use(notFoundHandler);

module.exports = router;
