import { Arg, Mutation, Resolver,Authorized } from "type-graphql";
import { getCustomRepository } from "typeorm";

import { TaskRepository } from "../../repositories/TaskRepository";
import { Task } from "../../models/Task";

@Resolver((_type) => Task)
export class CreateTask {
  @Mutation((_type) => Task)
  public async createTask(
    @Arg("title") title: string,
    @Arg("description") description: string,
  ): Promise<Task> {
    const taskRepository = getCustomRepository(TaskRepository);
    const task = taskRepository.create({
      title: title,
      description: description,
    });

    await taskRepository.save(task);
    return task;
  }
}
