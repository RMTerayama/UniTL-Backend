import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || "sua_chave_secreta_super_segura",
            signOptions: { expiresIn: '1h' },  // Tempo de expiração do token
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
