import * as basicAuth from 'express-basic-auth'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.use(
  //   ['/docs'],
  //   basicAuth({
  //     challenge: true,
  //     users: {
  //       yourUserName: 'p4ssw0rd',
  //     },
  //   }),
  // )
  const options = new DocumentBuilder()
    .setTitle('Logistics')
    .setDescription('Simple CRUD for managing logistics')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // forbidNonWhitelisted: true,
      transformOptions: {
        // enableImplicitConversion: true,
      },
    }),
  )
  app.enableCors()
  await app.listen(3000)
}
bootstrap()
