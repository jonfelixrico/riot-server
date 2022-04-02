import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { version } from '../package.json'
import { INestApplication, ValidationPipe } from '@nestjs/common'

function setUpSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('RIOT')
    .setDescription('The OpenAPI documentation for RIOT')
    .setVersion(version)
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('openapi', app, document)
}

/**
 * Sets up the validation pipe for the entire app.
 * Followed {@link https://docs.nestjs.com/techniques/validation this article}.
 * @param app
 */
function setUpValidation(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  setUpSwagger(app)
  setUpValidation(app)

  await app.listen(3000)
}
void bootstrap()
