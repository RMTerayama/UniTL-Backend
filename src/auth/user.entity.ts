import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' }) // Certifica-se de que a tabela se chama 'users'
export class User {
  @PrimaryGeneratedColumn()
  id_user: number; // Nome exato da coluna no banco

  @Column({ unique: true })
  usuario: string; // Alterado para "usuario" ao invés de "email"

  @Column({ unique: true, nullable: true }) 
  email: string; // Adicionado email para precaução futura

  @Column()
  senha_hash: string; // Deve estar exatamente como no banco

  @Column()
  role: string; // Se a coluna role existir no banco

  @Column({ nullable: true })
  departamento_id: number;
}
