import { applyJobDto, createJobDto } from '../../dtos/job.dto';

export interface IJobInterface {
  createJob: (
    clientId: number,
    userRole: string,
    createJobDto: createJobDto
  ) => any;

  applyJob: (jobId: number, clientId: number, applyJob: applyJobDto) => any;
  viewAppliedJobs: (clientId: number, jobId: number, job_status: string) => any;
  viewFilterJobs: (jobId: number, jobStatus: string) => any;
}
