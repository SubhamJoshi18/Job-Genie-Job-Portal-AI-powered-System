import { JsonWebTokenError } from 'jsonwebtoken';

enum JwtStatusCodeConstant {
  JWT_ERROR = 'JWT_Error',
  JWT_GOOD = 'JWT_Good',
}

export class AuthError extends Error {
  statusCode: number;
  status: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith('4')
      ? JwtStatusCodeConstant['JWT_ERROR']
      : JwtStatusCodeConstant['JWT_GOOD'];
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class JwtError extends JsonWebTokenError {}
