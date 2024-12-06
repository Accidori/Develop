import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token){
    return res.status(401).send('Access Denied');
  }

  try{
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as unknown as JwtPayload;

    req.user = decoded;
    next();
  }catch (error){
    console.error('token verification failed:', error);
  }

};
