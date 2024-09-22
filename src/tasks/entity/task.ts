import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from '../../projects/entity/project';
import { TaskStatus } from '../enum/task.status';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  title: string;

  @Column({ default: TaskStatus.IN_PROGRSES, type: 'varchar', length: 20, nullable: false })
  status: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  description: string;

  @Column({ type: 'date', length: 20, nullable: false })
  due_date: Date;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
}