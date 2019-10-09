const Controller = require('../../components/base');

const controller = new Controller();

class RoutesHandler {
  /**
   * Allow CORS handler
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next rout
   * @returns {undefined}
   */

  allowHeadersHandler(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-type,Authorization,Accept,X-Access-Token,X-Key',
    );
    next();
  }

  /**
   * Not found handler
   * @param {object} req - request
   * @param {object} res - response
   * @returns {undefined}
   */
  notFoundHandler(req, res) {
    controller.sendError(
      res,
      404,
      {},
      `Page not found ${req.get('host')} ${req.originalUrl}`,
    );
  }

  /**
   * Exception handler
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next route
   * @returns {undefined}
   */

  // eslint-disable-next-line no-unused-vars
  errorHandler(err, req, res, next) { 
    console.error(err);
    if (err.name === 'MulterError') {
      return controller.sendError(res, 422, err, err.message);
    }
    if (err.code && err.message) {
      return controller.sendError(res, err.code, err, err.message);
    }
    return controller.sendError(res, 500, err, 'Internal server error');
  }
}

module.exports = new RoutesHandler();
