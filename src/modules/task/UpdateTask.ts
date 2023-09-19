import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";

import { TaskRepository } from "../../repositories/TaskRepository";
import { Task } from "../../models/Task";

@Resolver((_type) => Task)
export class UpdateTask {
  @Mutation((_type) => Task)
  public async updateTask(
    @Arg("id") id: string,
    @Arg("title") title: string,
    @Arg("description") description: string,
  ): Promise<Task | null> {
    const taskRepository = getCustomRepository(TaskRepository);
    const task = await taskRepository.findOne(id);
    if (!task) {
      // Handle the case where the task with the given ID is not found
      return null;
    }
    // Update the task properties based on the input data
    if (title) {
      task.title = title;
    }
    if (description) {
      task.description = description;
    }
    await taskRepository.save(task);
    return task;
  }
}
