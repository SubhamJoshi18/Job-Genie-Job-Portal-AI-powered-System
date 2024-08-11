import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserProfile } from './userProfile.entity';
import { Person } from '../utils/person.entity';
import { Company } from './company.entity';
import { Job } from './job.entity';
import { Employee } from './employee.entity';
import { JobApplied } from './job_applied.entity';

export enum UserRoleStatusEnum {
  ADMIN = 'admin',
  CLIENT = 'client',
}

@Entity({ name: 'user' })
export class User extends Person {
  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({
    type: 'simple-enum',
    enum: UserRoleStatusEnum,
    default: UserRoleStatusEnum['CLIENT'],
  })
  role: string;

  @OneToOne(() => Employee, (employee) => employee.user)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  userProfile: UserProfile;

  @OneToOne(() => Company, (company) => company.user)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToOne(() => Job, (job) => job.user)
  job: Job;

  @OneToMany(() => JobApplied, (jobApplied) => jobApplied.user)
  jobApplied: JobApplied[];
}
