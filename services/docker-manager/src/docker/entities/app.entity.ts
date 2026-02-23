import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AppEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  port: number;

  @Column()
  containerId: string;

  @Column({ default: 'running' })
  status: string;
}