import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";

import { TaskRepository } from "../../repositories/TaskRepository";
import { Task } from "../../models/Task";

@Resolver((_type) => Task)
export class DeleteTask {
  @Mutation((_type) => Boolean)
  public async deleteTask(@Arg("id") id: string): Promise<boolean> {
    const taskRepository = getCustomRepository(TaskRepository);

    // Check if the task with the given id exists
    const task = await taskRepository.findOne(id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found.`);
    }

    // Delete the task
    await taskRepository.delete(id);

    return true;
  }
}
