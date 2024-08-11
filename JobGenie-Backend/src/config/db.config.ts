import { dbConfigType } from '../interface/db.config.interface';
import { User } from '../database/entities/user.entity';
import { UserProfile } from '../database/entities/userProfile.entity';
import { Job } from '../database/entities/job.entity';
import { Company } from '../database/entities/company.entity';
import { BlockList } from '../database/entities/blocklist.entity';
import { Employee } from '../database/entities/employee.entity';
import { JobApplied } from '../database/entities/job_applied.entity';

const dbConfig: dbConfigType = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'linkend',
  entities: [User, UserProfile, Job, Company, BlockList, Employee, JobApplied],
  synchronize: true,
};

export default dbConfig;
