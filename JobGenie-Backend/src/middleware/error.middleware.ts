import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/errors/app.error';

export const globalErrorHandler = (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    const status = err.status;
    const statusCode = err.statusCode;
    const message = err.message;
    const isOperational = err instanceof ApiError;
    return res.status(statusCode).json({
      status: status,
      message: message,
      isOperational,
    });
  }
  return res.status(500).json({
    message: err.message,
    isOperational: false,
  });
};
