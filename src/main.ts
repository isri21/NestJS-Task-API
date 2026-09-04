import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://localhost:3001"]
  })  

  const config = new DocumentBuilder()
    .setTitle('Simple Task API')
    .setDescription("A task tracker. A user can create a task, list tasks, \
                    mark one done, and delete it. That is the entire feature set, \
                    and it should stay that small, because the point is the plumbing \
                    between the pieces, not theproduct."
                  )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
