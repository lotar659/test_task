import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(ownerId: string, createTodoDto: CreateTodoDto) {
    const newTodo = await this.todoModel.create({
      ...createTodoDto,
      owner: ownerId,
    });

    return { id: newTodo.id };
  }

  async get(ownerId: string) {
    return await this.todoModel
      .find({ owner: ownerId })
      .select({ _id: 1, title: 1, description: 1 });
  }

  async delete(userId: string, id: string) {
    const todo = await this.todoModel.findById(id);

    if (!todo) throw new NotFoundException({ error_message: 'Item not found' });

    if (userId != todo.owner.toString())
      throw new ForbiddenException({ error_message: 'Is not an owner' });

    await todo.deleteOne();

    return { id: todo.id };
  }
}
