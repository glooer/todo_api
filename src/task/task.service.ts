import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";
import { TaskDto } from "./task.dto";
import { Task } from "./task.entity";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }

  async create(taskDto: TaskDto, userCreate: User): Promise<Task> {
    const task = new Task();
    task.user = userCreate
    task.text = taskDto.text;
    task.date = taskDto.date;
    task.isSuccess = taskDto.isSuccess;

    return this.taskRepository.save(task);
  }

  async update(id: number, taskDto: TaskDto, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id }, relations: ['user'] });

    if (task === null) {
      throw new NotFoundException("not found");
    }

    if (task.user.id !== user.id) {
      throw new ForbiddenException("not access");
    }

    task.text = taskDto.text;
    task.date = taskDto.date;
    task.isSuccess = taskDto.isSuccess;

    return this.taskRepository.save(task);
  }

  getAll(user: User) {
    return this.taskRepository.findBy({ user })
  }

  async remove(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id }, relations: ['user'] });

    if (task === null) {
      return Promise.resolve(null);
    }

    if (task.user.id !== user.id) {
      throw new ForbiddenException("not access");
    }

    return this.taskRepository.remove(task);
  }
}