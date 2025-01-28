import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403); // Invalid token
      }

      // Ensure decoded payload has a username
      const payload = decoded as JwtPayload & { username: string };

      if (!payload.username) {
        return res.sendStatus(403);
      }

      // Assigning id with a default value of 0
      req.user = { id: 0, username: payload.username }; 
      next();
    });
  } else {
    res.sendStatus(401); // No token provided
  }
};
