import { Application, Request, Response } from 'express';
import clientRouter from './client.routes';
import clientProfileRouter from './clientProfile.routes';
import companyRouter from './company.routes';
import { globalErrorHandler } from '../middleware/error.middleware';
import { connectGraphQl } from '../config/graphql.config';
import { expressMiddleware } from '@apollo/server/express4';
import jobRouter from './job.routes';

export const initalizeRoutes = async (expressApplication: Application) => {
  expressApplication.get('/', (req: Request, res: Response) => {
    return res.status(201).json({
      message: 'Server Running Successfully',
    });
  });
  const graphlQlConnection = connectGraphQl();
  await graphlQlConnection.start();
  expressApplication.use('/graphql', expressMiddleware(graphlQlConnection));
  expressApplication.use('/api', [
    clientRouter,
    clientProfileRouter,
    companyRouter,
    jobRouter,
  ]);

  expressApplication.all('*', (req: Request, res: Response) => {
    return res.status(404).json({
      message: `${req.originalUrl} is not valid URL`,
    });
  });

  expressApplication.use(globalErrorHandler);
};
