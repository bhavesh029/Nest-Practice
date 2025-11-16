import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly repo: Repository<Todo>,
  ) {}

  create(dto: CreateTodoDto) {
    const todo = this.repo.create(dto);
    return this.repo.save(todo);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const todo = await this.repo.findOne({ where: { id } });
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async update(id: number, dto: UpdateTodoDto) {
    const todo = await this.findOne(id);
    Object.assign(todo, dto);
    return this.repo.save(todo);
  }

  async remove(id: number) {
    const todo = await this.findOne(id);
    return this.repo.remove(todo);
  }
}