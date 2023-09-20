import "reflect-metadata";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";
const path = require('path');
require('dotenv').config();
import createSchema from "./schema";


TypeORM.useContainer(Container);

const bootstrap = async () => {
  try {
    
    await TypeORM.createConnection();

    
    const schema = await createSchema(Container);
   
    const app = express();

    app.use(cors());

    const port = process.env.PORT;

    
    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      debug: true,
      playground: true,
    });

    server.applyMiddleware({ app });

     app.listen({ port }, () => {
      console.log(
        `🚀 Server ready at ${port}${server.graphqlPath}`
      );
    });

    return app ; 
  } catch (err) {
    console.error(err);
  }
};
export default bootstrap;
bootstrap();

