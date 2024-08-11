import { Request, Response, Router } from 'express';
import { validateToken } from '../middleware/auth.middleware';
import { ClientProfileService } from '../services/clientProfile.service';
import { ClientProfileController } from '../controller/clientProfile.controller';
import { checkActiveMiddleware } from '../middleware/activate.middleware';
import { checkPermission } from '../middleware/rbac.middleware';
import { validate } from 'graphql';

const clientProfileRouter: Router = Router();
const clientProfileService = new ClientProfileService();
const clientProfileController = new ClientProfileController(
  clientProfileService
);

clientProfileRouter.get(
  '/client/profile',
  validateToken,
  checkActiveMiddleware,
  checkPermission('view_profile'),
  clientProfileController.viewUserProfile
);

clientProfileRouter.patch(
  '/client/profile',
  validateToken,
  checkActiveMiddleware,
  checkPermission('update_profile'),
  clientProfileController.createClientSetting
);

clientProfileRouter.patch(
  '/client/activate',
  validateToken,
  checkActiveMiddleware,
  checkPermission('activate_account'),
  clientProfileController.activateAccount
);

clientProfileRouter.get(
  '/test',
  validateToken,
  checkActiveMiddleware,
  (req: Request, res: Response) => {
    console.log(`Succesfully done`);
  }
);

export default clientProfileRouter;
