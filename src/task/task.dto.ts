import { Task } from "./task.entity";

export class TaskDto {
  id?: number
  text: string;
  date: Date;
  isSuccess: boolean

  static of(task: Task): TaskDto {
    if (!task) {
      return null;
    }

    const taskDto = new TaskDto();
    taskDto.id = task.id;
    taskDto.text = task.text;
    taskDto.date = task.date;
    taskDto.isSuccess = task.isSuccess;

    return taskDto;
  }
}