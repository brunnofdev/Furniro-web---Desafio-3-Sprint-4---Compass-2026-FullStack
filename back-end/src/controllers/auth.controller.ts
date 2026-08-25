import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
// Adjust the path to your http-exception file
import { HttpException } from '../shared/utils/http-exception';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw new HttpException(400, 'All fields (name, email, password) are required', null);
      }

      const user = await authService.register({ name, email, password });

      res.status(201).json(user);
    } catch (error: any) {
      if (error instanceof HttpException) {
        next(error);
      } else {
        next(new HttpException(400, error.message, null));
      }
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new HttpException(400, 'Email and password are required', null);
      }

      const data = await authService.login({ email, password });

      res.status(200).json(data);
    } catch (error: any) {
      // Matching the exact string thrown by the service
      if (error.message === 'Invalid credentials') {
        next(new HttpException(401, error.message, null));
      } else if (error instanceof HttpException) {
        next(error);
      } else {
        next(new HttpException(500, 'Internal server error', null));
      }
    }
  }
}
