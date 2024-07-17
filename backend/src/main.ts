import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SwaggerUIModules } from "./api-docs-index/swagger-ui-modules";
import { initializeTransactionalContext } from "typeorm-transactional";
import * as dotenv from "dotenv";
import { StocksModule } from "./stocks/stocks.module";

dotenv.config();

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  setupSwaggerUI(app);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on ${process.env.SERVER_PORT}`);
  });

  function setupSwaggerUI(app: INestApplication) {
    setupSwaggerUIForModule(app, "stocks", StocksModule);
  }

  function setupSwaggerUIForModule(
    app: INestApplication,
    name: string,
    module: any
  ) {
    const options = new DocumentBuilder()
      .setTitle(`${name} module`)
      .setDescription(`REST API for ${name} module`)
      .setVersion("3.0")
      .addTag(name)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options, {
      include: [module],
    });
    SwaggerModule.setup(`api-docs/${name}`, app, document);
    SwaggerUIModules.push(name);
  }
}
bootstrap();
