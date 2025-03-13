import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*", // 🚀 Permite chamadas do frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Se precisar enviar cookies/autenticação
  });

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
