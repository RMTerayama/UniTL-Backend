import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(usuario: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { usuario } });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    if (!user.senha_hash) {
      throw new UnauthorizedException('Senha não encontrada no banco');
    }

    const isPasswordValid = await bcrypt.compare(password, user.senha_hash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    return user;
  }

    async login(loginDto: LoginDto): Promise<{ access_token: string }> {
      const user = await this.validateUser(loginDto.usuario, loginDto.password);

      console.log('DEBUG NestJS - SECRET usada:', process.env.JWT_SECRET);
      console.log('DEBUG NestJS - Secret length:', process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      // 🔹 Agora o payload do UniTL segue exatamente o formato do SIGEM
      const payload = {
        iss: "localhost",
        sub: user.id_user,
        usuario: user.usuario,
        name: user.nome, // 🔹 Alterado de 'nome' para 'name' para ficar igual ao SIGEM
        role: user.role,
        departamento_id: user.departamento_id
      };

      const access_token = this.jwtService.sign(payload);

      console.log('DEBUG NestJS - Token gerado:', access_token);

      return { access_token };
    } 

}
