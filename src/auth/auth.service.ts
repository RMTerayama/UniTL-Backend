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

        // Verifica se a senha está definida no banco antes de tentar alterar o hash
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
  
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  
    const payload = { sub: user.id_user, usuario: user.usuario, role: user.role };
    const access_token = this.jwtService.sign(payload);
  
    return { access_token };
  }
  
}
