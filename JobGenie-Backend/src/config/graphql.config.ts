import { ApolloServer, ApolloConfig } from '@apollo/server';
import { Query } from 'typeorm/driver/Query.js';
import { GraphQLSchema } from '../graphql/schema/schema';
import { GraphQLResolver } from '../graphql/resolvers/resolver';
export const connectGraphQl = () => {
  const server = new ApolloServer<ApolloConfig>({
    typeDefs: GraphQLSchema,
    resolvers: GraphQLResolver,
    introspection: true,
  });
  return server;
};

export const checkGraphqlConnection = () => {
  const server = connectGraphQl();
  if (server) {
    return new Promise((resolve, reject) => {
      resolve(`Apollo Server started on ${4000} port`);
    });
  }
};
