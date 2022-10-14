import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @CreateDateColumn({ type: 'timestamp', name: 'criado_em' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'atualizado_em' })
  updatedAt: Date;
}
