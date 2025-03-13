import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  COORDENADOR = 'coordenador',
  PADRAO = 'padrao',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ length: 255 })
  nome: string; 

  @Column()
  departamento_id: number;

  @Column({ unique: true })
  usuario: string;

  @Column({ unique: true }) // Agora o email será obrigatório
  email: string;


  @Column()
  senha_hash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PADRAO,
  })
  role: UserRole;
}
