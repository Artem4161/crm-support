/* eslint-disable no-useless-constructor */
const AuthComponent = require('../components/auth/auth');
const { BaseComponent } = require('../components');
const AdminService = require('../services/admin');

class Check extends BaseComponent {
  constructor() {
    super();
  }

  auth() {
    return async (req, res, next) => {
      try {
        const { token, user, role } = await AuthComponent.getUser(req, res);
        req.user = user;
        req.role = role;
        req.token = token;
        next();
      } catch (error) {
        return super.sendError(res, 401, error, 'Token is invalid');
      }
    };
  }

  role() {
    return async (req, res, next) => {
      try {
        const { role } = req;
        req.roleData = await AdminService.role({ id: role });
        next();
      } catch (error) {
        return super.sendError(res, 401, error, 'Get role failed');
      }
    };
  }

  permission(...permissions) {
    return (req, res, next) => {
      try {
        const { roleData } = req;
        const allowed = permissions.every((el) => roleData.privilege[el] !== 0);

        if (!allowed) {
          return super.sendError(res, 403, {}, 'Permission denied');
        }
        next();
      } catch (error) {
        return super.sendError(res, 401, error, 'Check permissions failed');
      }
    };
  }
}

module.exports = new Check();
