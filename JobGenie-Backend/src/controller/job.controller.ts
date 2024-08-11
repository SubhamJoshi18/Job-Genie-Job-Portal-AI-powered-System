import { NextFunction, Request, Response } from 'express';
import { JobService } from '../services/job.service';
import { applyJobDto, createJobDto } from '../dtos/job.dto';

export class JobController {
  private jobService: JobService;

  constructor(jobService: JobService) {
    this.jobService = jobService;
  }

  private async sendResponse(
    res: Response,
    message: string,
    statusCode: number,
    data: any,
    info = null
  ) {
    return res.status(statusCode).json({
      message: message,
      statusCode: statusCode,
      data: data,
    });
  }

  createJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId = req.user.user_id;
      const userRole = req.user.user_role;
      const jobDto: createJobDto = req.body;
      const data = await this.jobService.createJob(clientId, userRole, jobDto);
      return this.sendResponse(res, 'Job Created Successfully', 201, data);
    } catch (err: any | unknown) {
      next(err);
    }
  };

  applyJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId: number = Number(req.params.jobId);
      const clientId = req.user.user_id;
      const applyJobDto: Partial<applyJobDto> = req.body;
      const data = await this.jobService.applyJob(
        jobId,
        clientId,
        applyJobDto as applyJobDto
      );
      return this.sendResponse(res, 'Job Applied Successfully', 201, data);
    } catch (err: any | unknown) {
      next(err);
    }
  };

  viewJobApplied = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId = req.user.user_id;
      const jobId = Number(req.params.jobId);
      const job_status: any = req.query.jobStatus;
      const data = await this.jobService.viewAppliedJobs(
        clientId,
        jobId,
        job_status
      );
      return this.sendResponse(res, 'All Applied Jobs', 201, data);
    } catch (err: any | unknown) {
      next(err);
    }
  };

  viewFilterJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId = Number(req.params.jobId);
      const jobStatus: any = req.query.jobStatus ? req.query.jobStatus : 'all';
      const data = await this.jobService.viewFilterJobs(jobId, jobStatus);
      const checkData = data.length === 0;
      return this.sendResponse(
        res,
        ` ${jobStatus} Jobs  are Fetches Successfully`,
        201,
        data
      );
    } catch (err: any | unknown) {
      next(err);
    }
  };
}
