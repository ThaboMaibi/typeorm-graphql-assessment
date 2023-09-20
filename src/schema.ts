import { Args, Ctx, Info, buildSchema } from "type-graphql";

import { CreateUser } from "./modules/user/CreateUser";
import { CreateTask } from "./modules/task/CreateTask";
import { GetTasks } from "./modules/task/GetTasks";
import { GetUsers} from "./modules/user/GetUsers";
import { DeleteTask } from "./modules/task/DeleteTask";
import { UpdateTask } from "./modules/task/UpdateTask";
import { CompleteTask } from "./modules/task/CompleteTask";
import { LoginUser } from "./modules/user/LoginUser";
import { applyMiddleware } from 'graphql-middleware';
import { rule } from "graphql-shield";
const {shield} = require('graphql-shield')
const jwt = require('jsonwebtoken');


const isAuthenticated = rule()(async (parent,args,ctx,info)=>{
  const authHeader = ctx.req.headers.authorization;
  if (authHeader) {
    // Bearer
    const token =  authHeader.split(' ')[1];
    if (token) {
    try {
    const user = jwt.verify(token, process.env.JWT_KEY);
    return true;
    } 
    catch (err) {
        return false;
    }
 }
  return false;
 }
 else return false;
})


const permissions =shield({
  Query:{
    getUsers: isAuthenticated,
    getTasks: isAuthenticated
  },
  Mutation:{
    createTask: isAuthenticated,
    updateTask: isAuthenticated,
    completeTask: isAuthenticated,
    deleteTask: isAuthenticated
  }
})

export default async () => {
  const schema = await buildSchema({
    resolvers: [CreateUser, GetUsers, CreateTask, GetTasks, DeleteTask, UpdateTask, CompleteTask, LoginUser],
  });

    // Apply Apollo Auth Middleware and GraphQL Shield middleware
    const schemaWithMiddleware = applyMiddleware(schema, permissions);

    return schemaWithMiddleware;
};
