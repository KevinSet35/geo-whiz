import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PathUtil } from './common/utility/path.utils';
import { ServeStaticMiddleware } from './serve-static-middleware';
import { NestExpressApplication } from '@nestjs/platform-express';

const port = process.env['PORT'] || 5000;

async function bootstrap() {
    // const app = await NestFactory.create(AppModule);
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors();

    app.setGlobalPrefix("api");
    // app.enableCors({
    //     origin: "http://localhost:3000",
    //     credentials: true, // if you're using cookies or auth headers
    // });

    // Serve the static files from the React app
    app.useStaticAssets(PathUtil.getStaticAssetsPath());

    // Apply the ServeStaticMiddleware
    app.use(new ServeStaticMiddleware().use);


    // Global pipes
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    // Security middleware
    //   app.use(helmet());
    //   app.use(cors());

    // Swagger documentation
    const config = new DocumentBuilder()
        .setTitle('geo-whiz API')
        .setDescription('The geo-whiz API documentation')
        .setVersion('1.0')
        .addTag('users')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(port);
    console.log(`Server running on port ${port}`);
}

bootstrap().catch(err => {
    console.error('Error starting server:', err);
    process.exit(1);
});
