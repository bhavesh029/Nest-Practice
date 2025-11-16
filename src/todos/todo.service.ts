import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

export type Todo = {
  id: number;
  title: string;
  description?: string;
  done: boolean;
};

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private idCounter = 1;
  
  create(createDto: CreateTodoDto ): Todo {
    const todo: Todo = {
        id: this.idCounter++,
        title: createDto.title,
        description: createDto.description,
        done: createDto.completed ?? false,
    };
    this.todos.push(todo);
    return todo;
  }

    findAll(): Todo[] {
        return this.todos;
    }

    findOne(id: number): Todo {
        const t = this.todos.find(x => x.id === id);
        if(!t) throw new NotFoundException(`Todo with id ${id} not found`);
        return t;
    }

    update(id: number, dto: UpdateTodoDto): Todo {
        const idx = this.todos.findIndex(x => x.id === id);
        if(idx === -1) throw new NotFoundException(`Todo with id ${id} not found`);
        const updated = {...this.todos[idx], ...dto};
        this.todos[idx] = updated;
        return updated;
    }

    remove(id: number) {
        const idx = this.todos.findIndex(x => x.id === id);
        if(idx === -1) throw new NotFoundException(`Todo with id ${id} not found`);
        this.todos.splice(idx, 1);
        return {removed: true};
    }
}