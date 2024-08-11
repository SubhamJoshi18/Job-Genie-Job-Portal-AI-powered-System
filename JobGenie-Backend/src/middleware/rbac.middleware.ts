import { NextFunction, Request, Response } from 'express';
import { Permission } from '../utils/roles/role';
import Logger from '../lib/logger';
import { AuthError } from '../utils/errors/auth.error';

export const checkPermission = (...permission) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user ? req.user.user_role : 'client';
    const userPermissions = new Permission().getPermissionByRoleName(userRole);
    const checkLength: Array<any> = [];
    const checkUserPermission = permission.map((permission) => {
      if (userPermissions.includes(permission)) {
        checkLength.push(permission);
      }
    });
    if (checkUserPermission.length > 0) {
      Logger.info('You are allowed');
      return next();
    } else {
      next(new AuthError(`You do no have permission to ${permission}`, 403));
    }
  };
};
