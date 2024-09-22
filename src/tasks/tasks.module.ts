import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../tasks/entity/task';
import { TasksService } from '../tasks/tasks.service';
import { TasksController } from './tasks.controller';
import { Project } from '../projects/entity/project';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Task])],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}