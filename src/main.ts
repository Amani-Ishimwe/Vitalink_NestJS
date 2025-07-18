import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle("Vital-Link")
  .setDescription("This is a platform that manages hospitals internally such as handling shifts")
  .setVersion("1.0")
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api',app,document)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
