import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { UserQueryFields, UserMutationFields } from "./userSchema";
import { BookQueryFields, BookMutationFields } from "./bookSchema";

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...BookQueryFields,
    ...UserQueryFields
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...BookMutationFields,
    ...UserMutationFields
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
