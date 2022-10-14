import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: "salas" })
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nome" })
  name: string;

  @CreateDateColumn({ type: 'timestamp', name: "criado_em" })
  createdAt: Date;
}
