import { Router } from 'express';
import { ClientController } from '../controller/client.controller';
import { ClientService } from '../services/client.service';
import { validateToken } from '../middleware/auth.middleware';
import { checkActiveMiddleware } from '../middleware/activate.middleware';
import { checkPermission } from '../middleware/rbac.middleware';
const clientService = new ClientService();
const clientController = new ClientController(clientService);

const clientRouter: Router = Router();

clientRouter.post('/client/register', clientController.registerClient);
clientRouter.post('/client/login', clientController.loginClient);
clientRouter.post(
  '/client/logout',
  validateToken,
  checkActiveMiddleware,
  checkPermission('client_logout'),
  clientController.logoutClient
);

export default clientRouter;
