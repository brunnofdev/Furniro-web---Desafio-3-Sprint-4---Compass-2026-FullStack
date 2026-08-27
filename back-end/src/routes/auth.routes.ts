import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../shared/middlewares/auth.middleware';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', authController.register.bind(authController));
authRoutes.post('/login', authController.login.bind(authController));

authRoutes.get('/me', authMiddleware, (req, res) => {
  res.status(200).json({ user: (req as any).user });
});

export { authRoutes };
