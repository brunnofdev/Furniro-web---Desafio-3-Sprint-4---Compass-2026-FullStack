import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '../utils/http-exception';

interface TokenPayload {
  sub: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new HttpException(401, 'Auth token not provided', []));
  }

  const [scheme, token] = authHeader.split(' ');

  if (!/^Bearer$/i.test(scheme) || !token) {
    return next(new HttpException(401, " Use 'Bearer <token>'", []));
  }

  const jwtSecret = process.env.JWT_SECRET || 'furniro_secret_default';

  try {
    const decoded = jwt.verify(token, jwtSecret) as TokenPayload;

    (req as any).user = {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email
    };

    next();
  } catch (error) {
    return next(new HttpException(401, 'Invalid token', []));
  }
}
