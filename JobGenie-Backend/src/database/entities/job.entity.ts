import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { Company } from './company.entity';
import { User } from './user.entity';
import { JobApplied } from './job_applied.entity';

export enum RoleConstantEnum {
  CEO = 'ceo',
  HR = 'hr',
  DEVELOPER = 'developer',
  SRE = 'sre',
  MANAGER = 'manager',
  QUALITY_ASSURANCE = 'quality_assurance',
}

interface JobSkill {
  skill_name: string;
  experienced_year: number;
  is_proficient: boolean;
}

export enum JobStatus {
  ACCEPT = 'accept',
  CLOSE = 'close',
  URGENT_ACCEPT = 'urgent_accept',
  join = 'join',
}

@Entity({ name: 'job' })
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  job_title: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  job_description: string;

  @CreateDateColumn()
  job_created_at: Date;

  @Column({
    type: 'date',
    nullable: false,
  })
  job_end_date: Date;

  @Column('jsonb')
  job_skills_required: JobSkill[];

  @Column({
    type: 'simple-enum',
    enum: RoleConstantEnum,
    nullable: true,
  })
  role: string;

  @Column({
    type: 'simple-enum',
    enum: JobStatus,
    default: JobStatus.ACCEPT,
  })
  job_status: string;

  @Column({
    type: 'bigint',
    default: 0,
  })
  applied_employee: number;

  @ManyToOne(() => Company, (company) => company.job)
  @JoinColumn({
    name: 'company_id',
  })
  company: Company;

  @OneToOne(() => User, (user) => user.job)
  user: User;

  @OneToMany(() => JobApplied, (jobApplied) => jobApplied.job)
  jobApplied: JobApplied[];
}
