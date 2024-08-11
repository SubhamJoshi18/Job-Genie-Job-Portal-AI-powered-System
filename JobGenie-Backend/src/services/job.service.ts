import { User } from '../database/entities/user.entity';
import { applyJobDto, createJobDto } from '../dtos/job.dto';
import { IJobInterface } from '../interface/job/job.interface';
import {
  Job,
  JobStatus,
  RoleConstantEnum,
} from '../database/entities/job.entity';
import ApiError from '../utils/errors/app.error';
import { Company } from '../database/entities/company.entity';
import { JobApplied } from '../database/entities/job_applied.entity';
import { sendEmail } from '../utils/smtp/sendEmail';
import { createHtmlTemplate } from '../utils/smtp/htmlTemplate';

export class JobService implements IJobInterface {
  private checkEmptyObject = (objectName) => {
    for (let prop in objectName) {
      if (objectName.hasOwnProperty(prop)) {
        return false;
      }
      return true;
    }
  };

  createJob: (
    clientId: number,
    userRole: string,
    createJobDto: createJobDto
  ) => any = async (
    clientId: number,
    userRole: string,
    createJobDto: createJobDto
  ) => {
    const user = await User.findOne({
      where: {
        id: clientId,
      },
      relations: {
        company: true,
      },
    });
    const checkJob = Object.entries(createJobDto).length > 0;
    if (!checkJob) {
      throw new ApiError(`Job Credentials is Empty`, 401);
    }

    const { job_role, job_skills_required, ...jobDto } = createJobDto;
    let role_validator: Array<any> = [];
    const checkRole = Object.values(RoleConstantEnum).filter((data) => {
      if (data === job_role) {
        role_validator.push(job_role);
        return true;
      }
    });

    const IsRole_valid =
      role_validator.length > 0
        ? role_validator.map((data) => {
            console.log(data);
            return data;
          })
        : null;
    if (!IsRole_valid) {
      throw new ApiError(`Role Is not valid`, 401);
    }

    console.log(user);

    const companyId: any = user.company.id ? user.company.id : null;
    if (!companyId) {
      throw new ApiError('User is not at a company', 401);
    }
    const userCompany = await Company.findOne({
      where: {
        id: companyId,
      },
    });
    const uploadJobs = Job.create({
      ...jobDto,
      role: job_role,
      job_skills_required: job_skills_required,
    });
    const saveJobs = await uploadJobs.save();
    userCompany.job = [saveJobs];
    userCompany.save();

    const message = `Job Created Successfully by Company ${userRole}.tr `;
    return message;
  };

  applyJob: (jobId: number, clientId: number, applyJobDto: applyJobDto) => any =
    async (jobId: number, clientId: number, applyJobDto: applyJobDto) => {
      const user = await User.createQueryBuilder()
        .select('user')
        .from(User, 'user')
        .where('user.id = :id', { id: clientId as number })
        .getOne();

      const job = await Job.findOne({
        where: {
          id: jobId as number,
        },
        relations: {
          company: true,
        },
      });
      const checkJobApply = Object.keys(applyJobDto).length === 0;
      if (checkJobApply) {
        throw new ApiError(`All Job Crdential is missing`, 401);
      }
      /*  const currentDate = new Date();
      if (currentDate > job.job_created_at) {
        throw new ApiError(`${job.job_title} is already expired`, 409);
      }
        */
      if (!job) throw new ApiError('Job Not Found', 401);
      if (
        applyJobDto.expected_salary &&
        applyJobDto.expected_salary.toString().startsWith('0')
      ) {
        throw new ApiError(`Expected salary cannot be 0`, 401);
      }
      const applyJob = JobApplied.create({
        ...applyJobDto,
      });
      const saveApplyJob = await applyJob.save();
      job.jobApplied = [saveApplyJob];
      await job.save();

      await Job.createQueryBuilder()
        .update(Job)
        .set({ applied_employee: job.applied_employee + 1 })
        .where('job.id = :id', { id: jobId as number })
        .execute();
      saveApplyJob.user = user;
      await saveApplyJob.save();
      const emailCredentials = {
        applicant_name: user.firstName,
        job_title: job.job_title,
        company_name: job.company.company_name,
        company_created_at: job.company.company_created_at,
        company_city: job.company.address.city,
        company_country: job.company.address.country,
        company_email: `www.example.coom`,
      };

      const htmlTemplate = createHtmlTemplate(emailCredentials);
      const subject = `Job Application`;
      const text = `${job.job_title}`;
      await sendEmail(applyJobDto.employee_email, subject, text, htmlTemplate);
      const message = `${user.firstName} Has Applied For ${job.job_title}`;
      return message;
    };

  viewAppliedJobs: (
    clientId: number,
    jobId: number,
    job_status: string
  ) => any = async (clientId: number, jobId: number, job_status: string) => {
    const jobs = await Job.createQueryBuilder()
      .select('job')
      .from(Job, 'job')
      .leftJoinAndSelect('job.jobApplied', 'jobApplied')
      .where('job.id = :id', { id: jobId as number })
      .getOne();
    if (!jobs.jobApplied) {
      throw new ApiError(`No Jobs are applied to ${jobs.job_title}`, 401);
    }
    return jobs.jobApplied;
  };

  viewFilterJobs: (jobId: number, jobStatus: string) => any = async (
    jobId: number,
    jobStatus: string
  ) => {
    let jobs: Array<Job>;
    switch (jobStatus) {
      case JobStatus.ACCEPT: {
        jobs = await Job.createQueryBuilder()
          .select('job')
          .from(Job, 'job')
          .where('job.job_status = :job_status', {
            job_status: JobStatus.ACCEPT,
          })
          .getMany();
        return jobs;
      }

      case JobStatus.CLOSE: {
        jobs = await Job.createQueryBuilder()
          .select('job')
          .from(Job, 'job')
          .where('job.job_status = :job_status', {
            job_status: JobStatus.CLOSE,
          })
          .getMany();
        return jobs;
      }

      case JobStatus.URGENT_ACCEPT: {
        jobs = await Job.createQueryBuilder()
          .select('job')
          .from(Job, 'job')
          .where('job.job_status = :job_status', {
            job_status: JobStatus.URGENT_ACCEPT,
          })
          .getMany();
        return jobs;
      }
      default: {
        jobs = await Job.createQueryBuilder()
          .select('job')
          .from(Job, 'job')
          .getMany();
        return jobs;
      }
    }
  };
}
