const router = require('express').Router();
const AuthController = require('./controller');
const { check, validate } = require('../../middlewares');
const login = require('./schemas');

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     description: Login user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: "object"
 *           required:
 *             - "email"
 *             - "password"
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *               format: password
 *     responses:
 *       200:
 *         description: "successful"
 *       422:
 *         description: "error"
 */
router.post(
  '/login',
  validate.validateSchema(login),
  AuthController.login,
);
/**
 * @swagger
 * /v1/auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     description: Get auth user
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: "Send user data"
 *       401:
 *         description: ""
 */
router.get(
  '/me',
  check.auth(),
  AuthController.me,
);
/**
 * @swagger
 * /v1/auth/role/:id:
 *   get:
 *     tags:
 *       - Auth
 *     description: Get admin role
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: header
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: "Send user data"
 *       401:
 *         description: ""
 */
router.get(
  '/role/:id',
  check.auth(),
  AuthController.role,
);
/**
 * @swagger
 * /v1/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     description: Logout user
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *     responses:
 *       401:
 *         description: "Logout successful"
 *       404:
 *         description: "Logout error, token not found"
 */
router.post(
  '/logout',
  check.auth(),
  AuthController.logout,
);
/**
 * @swagger
 * /v1/auth/refresh:
 *   post:
 *     tags:
 *       - Auth
 *     description: Refresh token
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: "Refresh token"
 *       404:
 *         description: ""
 */
router.post(
  '/refresh',
  check.auth(),
  AuthController.refresh,
);

module.exports = router;
