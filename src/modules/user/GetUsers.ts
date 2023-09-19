import { Resolver, Query } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { User } from "../../models/User";
import { UserRepository } from "../../repositories/UserRepository";

@Resolver((_type) => User)
export class GetUsers {
  constructor(
    @InjectRepository()
    private readonly userRepository: UserRepository
  ) {}

  @Query((_type) => [User])
  public async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find({});

    return users;
  }
}
