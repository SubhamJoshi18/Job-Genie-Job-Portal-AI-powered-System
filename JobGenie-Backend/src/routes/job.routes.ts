import { Request, Response, Router } from 'express';
import { JobService } from '../services/job.service';
import { JobController } from '../controller/job.controller';
import { validateToken } from '../middleware/auth.middleware';
import { checkActiveMiddleware } from '../middleware/activate.middleware';
import { checkPermission } from '../middleware/rbac.middleware';
import { query, validationResult } from 'express-validator';
import { JobStatus } from '../database/entities/job.entity';
import { NextFunction } from 'express-serve-static-core';
const jobRouter: Router = Router();
const jobService = new JobService();
const jobController = new JobController(jobService);

jobRouter.post(
  '/jobs',
  validateToken,
  checkActiveMiddleware,
  checkPermission('create_jobs'),
  jobController.createJob
);

jobRouter.post(
  '/jobs/:jobId',
  validateToken,
  checkActiveMiddleware,
  checkPermission('apply_jobs'),
  jobController.applyJob
);

jobRouter.get(
  '/jobs/:jobId/applied',
  validateToken,
  checkActiveMiddleware,
  checkPermission('view_jobs'),
  jobController.viewJobApplied
);

jobRouter.get(
  '/jobs',
  validateToken,
  checkActiveMiddleware,
  query('jobStatus')
    .optional()
    .isIn(Object.values(JobStatus))
    .withMessage(
      `Status must be one of the following : (accept, urgent_accept,closed)}`
    ),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  jobController.viewFilterJobs
);

export default jobRouter;
