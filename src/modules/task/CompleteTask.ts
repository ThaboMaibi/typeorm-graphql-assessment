import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { ApolloError } from 'apollo-server-express';

import { TaskRepository } from "../../repositories/TaskRepository";
import { Task } from "../../models/Task";

@Resolver((_type) => Task)
export class CompleteTask {
  @Mutation((_type) => Task)
  public async completeTask(
    @Arg("id") id: string,
  ): Promise<Task | null> {
    const taskRepository = getCustomRepository(TaskRepository);
    const task = await taskRepository.findOne(id);
    if (!task) {
      throw new ApolloError("task not found","TASK_NOT_FOUND");
    }
    task.is_completed = true;

    await taskRepository.save(task);
    return task;
  }
}