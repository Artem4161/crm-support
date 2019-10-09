/* eslint-disable no-useless-constructor */
const { compareSync } = require('bcryptjs');
const BaseComponent = require('../../components/base');
const AdminService = require('../../services/admin');
const RefreshTokenService = require('../../services/refreshToken');
const { issueTokenPair } = require('../../components/auth/token');

class AuthController extends BaseComponent {
  constructor() {
    super();
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      Logger.server(`Authorize with credentials: ${email} | ${password}`);
      const admin = await AdminService.find({ email });
      if (!admin) {
        return super.sendError(
          res,
          404,
          {},
          'Email not registered',
        );
      }
      if (!compareSync(password, admin.password)) {
        return super.sendError(
          res,
          403,
          {},
          'Invalid password',
        );
      }
      const data = await issueTokenPair(admin._id, admin.role);
      return super.sendResponse(res, data, 'Generate pair token', 200);
    } catch (error) {
      return super.sendError(res, 403, {}, 'Error generating pair token');
    }
  }

  async me(req, res) {
    try {
      const data = req.user;
      return super.sendResponse(res, data, 'Get me user');
    } catch (error) {
      return super.sendError(res, 422, error, 'Token is invalid');
    }
  }

  async save(req, res) {
    try {
      const { email, password } = req.body;
      const admin = await AdminService.save(req.body);
      return super.sendResponse(res, admin, 'Get me user');
    } catch (error) {
      return super.sendError(res, 422, error, 'Token is invalid');
    }
  }

  async role(req, res) {
    try {
      const content = await AdminService.role(req.params);
      return super.sendResponse(res, content, 'Get role');
    } catch (error) {
      return super.sendError(res, 401, error, 'Get role failed.');
    }
  }

  async refresh(req, res) {
    const { refreshToken } = req.body;
    const pairTokens = await RefreshTokenService.find({ refreshToken });
    if (!pairTokens) {
      return super.sendError(
        res,
        404,
        {},
        `Invalid refresh token: ${refreshToken}`,
      );
    }
    await RefreshTokenService.remove(pairTokens);
    const data = await issueTokenPair(pairTokens.userId, pairTokens.role);
    return super.sendResponse(
      res,
      data,
      `Generate new pair token with refreshToken: ${refreshToken}`,
      200,
    );
  }

  async logout(req, res) {
    try {
      const { token } = req;
      const removeTokenPair = await RefreshTokenService.remove({
        token,
      });
      if (!removeTokenPair) {
        return super.sendError(
          res,
          404,
          {},
          `Logout failed. Token ${token} not found`,
        );
      }
      return super.sendResponse(
        res,
        { token },
        `Success logout for: ${token} success`,
        200,
      );
    } catch (error) {
      return super.sendError(res, 401, {}, 'Logout failed.');
    }
  }
}
module.exports = new AuthController();
