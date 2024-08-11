import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Job } from './job.entity';
import { User } from './user.entity';

enum JobApplyStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

@Entity({ name: 'jobApplied' })
export class JobApplied extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  employee_email: string;

  @Column({
    type: 'bigint',
    nullable: true,
  })
  experienced_year: number;

  @Column({
    type: 'bool',
    nullable: true,
  })
  have_worked: boolean;

  @Column({
    type: 'simple-enum',
    enum: JobApplyStatus,
    default: JobApplyStatus['PENDING'],
  })
  jobStatus: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  phone_number: string;

  @Column({
    type: 'numeric',
    nullable: true,
  })
  expected_salary: number;

  @ManyToOne(() => Job, (job) => job.jobApplied)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => User, (user) => user.jobApplied)
  user: User;
}
