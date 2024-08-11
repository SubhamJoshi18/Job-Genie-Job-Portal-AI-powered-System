import { Job } from '../../database/entities/job.entity';
import { User } from '../../database/entities/user.entity';

export const findAllUser = async () => {
  const users = await User.createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .getMany();
  return users;
};

export const findllJobs = async () => {
  const jobs = await Job.createQueryBuilder()
    .select('job')
    .from(Job, 'job')
    .getMany();
  return jobs;
};
