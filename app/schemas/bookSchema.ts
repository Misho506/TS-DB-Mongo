// src/schema.ts
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLFieldConfig, ThunkObjMap } from 'graphql';
import Book from '../models/book';

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
  },
});

const BookQueryFields: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  book: {
    type: BookType,
    args: { id: { type: GraphQLID } },
    resolve(_parent, args) {
      return Book.findById(args.id);
    },
  },
  books: {
    type: new GraphQLList(BookType),
    resolve() {
      return Book.find({});
    },
  },
}

const BookMutationFields: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  addBook: {
    type: BookType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      author: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(_parent, args) {
      const book = new Book({
        title: args.title,
        author: args.author,
      });
      return book.save();
    },
  },
}

export {
  BookQueryFields,
  BookMutationFields
};
