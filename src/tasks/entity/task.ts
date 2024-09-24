import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from '../../projects/entity/project';
import { TaskStatus } from '../enum/task.status';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  title: string;

  @Column({ default: TaskStatus.IN_PROGRESS, type: 'varchar', length: 20 })
  status: TaskStatus;

  @Column({ type: 'varchar', length: 20 })
  description: string;

  @Column({ type: 'date' })
  due_date: Date;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: "project_id" })
  project: Project;
}