import { NextFunction, Request, Response } from 'express';
import { AuthError } from '../utils/errors/auth.error';
import { User } from '../database/entities/user.entity';
import JwtUtils from '../utils/jwt/jwt.utils';
import { JsonWebTokenError } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
      token?: any;
      query_status?: any;
    }
  }
}

type DecodedTokenType = {
  id: number;
  firstName: string;
  email: string;
};

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers['authorization'];
  if (!token) {
    next(new AuthError(`Auth Token is missing`, 401));
  }
  if (token.startsWith(`Bearer `)) {
    token = token.split(' ')[1];
  }
  try {
    const decodedToken: DecodedTokenType | {} | any =
      await JwtUtils.verifyAccessToken(token as string);
    const checkDecodedToken = Object.entries(decodedToken).length > 0;
    if (!checkDecodedToken) {
      next(new AuthError(`Token Payload is Empty`, 401));
    }
    console.log('this is a decoded token', decodedToken);
    const checkUser = await User.findOne({
      where: {
        id: decodedToken?.user_id,
      },
    });
    const checkId = checkUser.hasId && checkUser.id === decodedToken.user_id;
    if (!checkId) {
      throw new AuthError(`Authentication failed id does not match`, 403);
    }
    req.user = decodedToken;
    req.token = token;
    next();
  } catch (err: any | unknown) {
    if (err instanceof AuthError) {
      next(err);
    }
    next(err);
  }
};
