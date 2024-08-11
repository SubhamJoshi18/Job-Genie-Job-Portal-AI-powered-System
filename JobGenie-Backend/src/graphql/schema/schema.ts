import { findAllUser } from '../controller/user.resolver';

export const GraphQLSchema = `#graphql
 
  type User{
    firstName:String
    lastName:String
    middleName:String!
    email:String
    password:String!
    gender:String
    phoneNumber:String
  }

 type JobSkill {
  skill_name : String
  experienced_year : String
  is_proficient:Boolean
 }

  type Job{
   job_title:String
   job_description : String
   job_created_at: String!
   job_end_date : String!
   job_skills_required : [JobSkill]
   role :String
   job_status:String
   applied_employee : Int
  }

  type Query {
    hello : String
    getAllUser : [User],
    getAllJobs : [Job]
  }

`;
