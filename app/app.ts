import express, { Application, Request, Response } from 'express'
import connectDB from './config/db';
import { graphqlHTTP } from 'express-graphql';
import { applyMiddleware } from 'graphql-middleware';
import schemas from './schemas';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express/dist/ApolloServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
const port = process.env.ENV_PORT || 5000

connectDB();

const app = express()
// Apply middleware
app.use(cors());

// app.use(
//   '/books',
//   graphqlHTTP({
//     schema: bookSchema,
//     graphiql: true, // Enable GraphiQL for testing in the browser
//   })
// );

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schemas,
    graphiql: true, // Enable GraphiQL for testing in the browser
  })
);
// Create executable schema
// const schema: GraphQLSchema = makeExecutableSchema({
//   schemas
// });
// Apply middleware to the schema
// const schemaWithMiddleware = applyMiddleware(schemas);
// Create Apollo Server
const server = new ApolloServer({
  schema: schemas,
  context: ({ req }) => ({ req })
});
await server.start()
// Apply Apollo middleware to Express
server.applyMiddleware({ app });

app.listen(port, () => console.log(`Server started on port ${port}`));
