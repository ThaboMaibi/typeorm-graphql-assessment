import { Resolver, Query } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Task } from "../../models/Task";
import { TaskRepository } from "../../repositories/TaskRepository";

@Resolver((_type) => Task)
export class GetTasks {
  constructor(
    @InjectRepository()
    private readonly taskRepository: TaskRepository
  ) {}

  @Query((_type) => [Task])
  public async getTasks(): Promise<Task[]> {
    const tasks = await this.taskRepository.find({});

    return tasks;
  }
}
