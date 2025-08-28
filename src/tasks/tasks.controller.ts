import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";

@Controller('task')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }

    @Get('all')
    findAll() {
        return this.tasksService.findAll();
    }

    @Get(':id')
    getTask(@Param('id') id: string) {
        return this.tasksService.getTask(+id);
    }

    @Post()
    createTask(@Body() dto: CreateTaskDto) {
        return this.tasksService.createTask(dto)
    }

    @Put(':id')
    updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
        return this.tasksService.updateTask(+id, dto);
    }

    @Patch(':id')
    patchTask(@Param('id') id: string, @Body() dto: Partial<UpdateTaskDto>) {
        return this.tasksService.patchTask(+id, dto);
    }
    @Delete(':id')
    deleteTask(@Param('id') id: string) {
        return this.tasksService.deleteTask(+id);
    }

}
