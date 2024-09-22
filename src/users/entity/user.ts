import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../../projects/entity/project';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  password: string;

  @OneToMany(() => Project, (project) => project.user)
  @JoinColumn({ name: "project_id" })
  projects: Project[];

}