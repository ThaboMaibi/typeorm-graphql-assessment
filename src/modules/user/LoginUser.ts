import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { User } from "../../models/User";
import { UserRepository } from "../../repositories/UserRepository";
const jwt = require("jsonwebtoken");

@Resolver((_type) => User)
export class LoginUser {

  @Mutation((_type) => User)
  public async loginUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
  ): Promise<User | null> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    if (!(password==user.password)) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "30d",
      }
    );

    user.token = token;
    return user;
  }
}
