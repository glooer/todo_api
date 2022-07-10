import { Body, Controller, Delete, Get, Param, Post, Put, Request } from "@nestjs/common";
import { WithAuth } from "src/auth/auth.jwt.guard";
import { RequestData } from "src/users/type";
import { TaskDto } from "./task.dto";
import { TaskService } from "./task.service";

@Controller("task")
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
  ) { }

  @Post()
  @WithAuth()
  async create(
    @Body() taskDto: TaskDto,
    @Request() req: RequestData
  ): Promise<TaskDto> {
    return this.taskService.create(taskDto, req.user).then(TaskDto.of);
  }

  @Put(":id")
  @WithAuth()
  async update(
    @Body() taskDto: TaskDto,
    @Request() req: RequestData,
    @Param('id') id: number
  ): Promise<TaskDto> {
    return this.taskService.update(id, taskDto, req.user).then(TaskDto.of);
  }

  @Get()
  @WithAuth()
  async getAll(
    @Request() req: RequestData,
  ): Promise<TaskDto[]> {
    return this.taskService.getAll(req.user).then(data => data.map(TaskDto.of));
  }

  @Delete(":id")
  @WithAuth()
  async remove(
    @Request() req: RequestData,
    @Param('id') id: number
  ): Promise<TaskDto> {
    return this.taskService.remove(id, req.user).then(TaskDto.of);
  }
}