import { findAllUser } from '../controller/user.resolver';
import { findllJobs } from '../controller/user.resolver';
export const GraphQLResolver = {
  Query: {
    hello: () => {
      return 'Hello World';
    },

    getAllUser: findAllUser,
    getAllJobs: findllJobs,
  },
};
