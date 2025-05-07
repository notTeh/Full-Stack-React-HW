import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    const user = decoded as JwtPayload; // Explicitly cast decoded to JwtPayload
    req.body.user = user; // Add user data to request object
    return next(); // Ensure all code paths return a value
  });
  return;
};
