import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entity/user';
import { Project } from './entity/project';
import { Task } from '../tasks/entity/task';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TasksModule } from '../tasks/tasks.module';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Project, Task]), TasksModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, AuthService, UsersService, JwtService],
  exports: [ProjectsService],
})
export class ProjectsModule {}