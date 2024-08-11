import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { User } from './user.entity';

enum EmployeeStatus {
  MANAGER = 'manager',
  HR = 'hr',
  employee = 'employee',
  CEO = 'ceo',
}

@Entity({ name: 'employee' })
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn()
  employee_started_at: Date;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  employee_expected_salary: number;

  @Column({
    type: 'simple-enum',
    enum: EmployeeStatus,
  })
  employee_role: string;

  @OneToOne(() => User, (user) => user.employee)
  user: User;

  @ManyToMany(() => Company)
  company: Company[];
}
