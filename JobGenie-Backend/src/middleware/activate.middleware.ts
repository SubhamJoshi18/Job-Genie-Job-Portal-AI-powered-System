import { NextFunction, Request, Response } from 'express';
import { UserProfile } from '../database/entities/userProfile.entity';
import { User } from '../database/entities/user.entity';
import Logger from '../lib/logger';
import { AuthError } from '../utils/errors/auth.error';
export const checkActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientId = req.user.user_id as number;
  const existClient = await User.createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .leftJoinAndSelect('user.userProfile', 'profile')
    .where('user.id = :id', { id: clientId })
    .getOne();
  if (
    typeof existClient.userProfile.is_active === 'boolean' &&
    existClient.userProfile.is_active
  ) {
    Logger.info(`Client Account is activated`);
    req.query_status = req.query.jobStatus ? req.query.jobStatus : null;
    next();
  } else {
    next(
      new AuthError('User Profile is not acitve, Please Activated Account', 403)
    );
  }
};
