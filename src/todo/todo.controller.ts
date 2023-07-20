import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  create(@Request() req, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(req.user.id, createTodoDto);
  }

  @Get('get')
  findAll(@Request() req) {
    return this.todoService.get(req.user.id);
  }

  @Delete('delete/:id')
  remove(@Request() req, @Param('id') id: string) {
    return this.todoService.delete(req.user.id, id);
  }
}
