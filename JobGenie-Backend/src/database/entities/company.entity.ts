import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Job } from './job.entity';
import { Employee } from './employee.entity';

@Entity({ name: 'company' })
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  company_name: string;

  @Column({
    type: 'bigint',
    nullable: false,
    default: 0,
  })
  company_employee: number;

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  address: {
    city: string;
    country: string;
    postal_code: number;
  };

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  company_email: string;

  @CreateDateColumn()
  company_created_at: Date;

  @OneToOne(() => User, (user) => user.company)
  user: User;

  @ManyToMany(() => Employee)
  @JoinTable({
    name: 'company_employee',
    joinColumn: {
      name: 'employee',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'company',
      referencedColumnName: 'id',
    },
  })
  employee: Employee[];

  @OneToMany(() => Job, (job) => job.company)
  job: Job[];
}
