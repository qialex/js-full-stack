import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

declare const module: any;

async function bootstrap() {
  
  const port = process.env.API_DOCKER_PORT || 3001

  const app = await NestFactory.create(AppModule);

  app.enableCors()

  await app.listen(port).then((_value) => {
    console.log(`Server started at http://localhost:${port}`)
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
