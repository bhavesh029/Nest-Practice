import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Controller('todos')
export class TodoController {
    constructor(private readonly svc: TodoService) {}

    @Post()
    create(@Body() createDto: CreateTodoDto) {
        return this.svc.create(createDto);
    }

    @Get()
    findAll() {
        return this.svc.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.svc.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateTodoDto) {
        return this.svc.update(id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.svc.remove(id);
    }
}