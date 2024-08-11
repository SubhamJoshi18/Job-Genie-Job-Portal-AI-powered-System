import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { resolve } from 'path';
import { AuthError } from '../errors/auth.error';

type userCredentials = {
  firstName: string;
  email: string;
  id: number;
  role: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

class JwtUtils {
  public static async createAccessToken(user: userCredentials) {
    const options = {
      expiresIn: '1h',
      issuer: 'Subham Joshi',
    };
    const payload = {
      user_name: user.firstName,
      user_email: user.email,
      user_id: user.id,
      user_role: user.role,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        secret as string,
        options,
        (err: JsonWebTokenError, token: string) => {
          if (token !== undefined || null) {
            resolve(token);
          } else {
            reject(err);
          }
        }
      );
    });
  }

  public static async verifyAccessToken(token: string) {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    return new Promise((resolve, reject) => {
      jwt.verify(token as string, secret as string, (err, payload) => {
        if (payload) {
          resolve(payload);
        } else {
          throw new AuthError(err.message, 401);
        }
      });
    });
  }
}

export default JwtUtils;
