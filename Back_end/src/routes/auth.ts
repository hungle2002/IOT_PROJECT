import express from 'express';
import AuthController from '../controllers/AuthController';
const router = express.Router();

router.route('/reg').post(AuthController.handleRegister);
router.route('/login').post(AuthController.handleLogin);

export default router;
