import { RoleConstantEnum } from '../database/entities/job.entity';
export interface createJobDto {
  job_title: string;

  job_description: string;

  job_created_at: string;

  job_end_date: Date;

  job_skills_required: any;

  job_role: RoleConstantEnum;
}

export interface applyJobDto {
  employee_email: string;
  experienced_year?: number;
  have_worked?: boolean;
  phone_number: string;
  expected_salary: number;
}
