import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'rpBackend';

declare global {
    namespace Express {
      interface Request {
        teach?: any;
      }
    }
  }

const fetchteach = (req: Request, res: Response, next: NextFunction): void => {
    // Get the teach from the jwt token and add id to req object
    const token: string | undefined = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
        return;
    }
    try {
        const data = jwt.verify(token, JWT_SECRET) as { teach: any }; // Assuming 'teach' can be of any type
        req.teach = data.teach;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

export default fetchteach;
