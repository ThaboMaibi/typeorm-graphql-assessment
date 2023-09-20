import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";

import { User } from "../../models/User";
import { UserRepository } from "../../repositories/UserRepository";
const jwt = require("jsonwebtoken");

@Resolver((_type) => User)
export class CreateUser {
  @Mutation((_type) => User)
  public async createUser(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
  ): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    // hash the password

    const user = userRepository.create({
      name: name,
      email: email.toLocaleLowerCase(),
      password: password,
    });
    const token = jwt.sign({
          userId:user.id,
          email:user.email
        },
        process.env.JWT_KEY,
        {
          expiresIn: "30d",
        })
        
    user.token = token;

    await userRepository.save(user);
    return user;
  }
}
