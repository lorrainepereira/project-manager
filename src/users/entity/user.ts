import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../../projects/entity/project';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  password: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

}