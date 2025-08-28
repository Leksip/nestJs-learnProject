import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";

@Injectable()
export class TasksService {
    private tasks = [
        {
            id: 1,
            title: 'test',
            description: 'test',
            isDone: false,
        },
        {
            id: 2,
            title: 'test2',
            description: 'test2',
            isDone: false,
        }
    ];

    findAll() {
        return this.tasks;
    }

    getTask(id: number) {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return task
    }

    createTask(dto: CreateTaskDto) {
        const {title, description,priority, tags} = dto;

        const newTask = {
            title,
            description,
            isDone: false,
            priority,
            tags,
            id: this.tasks.length + 1,
        }

        this.tasks.push(newTask);
        return this.tasks;
    }

    updateTask(id: number, dto: UpdateTaskDto) {
        const task = this.getTask(id);
        const {title, description, isDone} = dto;
        task.title = title;
        task.description = description;
        task.isDone = isDone;
        return task;
    }

    patchTask(id: number, dto: Partial<UpdateTaskDto>) {
        const task = this.getTask(id);
        Object.assign(task, dto);
        return task;
    }

    deleteTask(id: number) {
        const findTask = this.getTask(id);
        this.tasks = this.tasks.filter(task => task.id !== findTask.id);
        return this.tasks;
    }
}
