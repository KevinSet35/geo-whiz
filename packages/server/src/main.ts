import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PathUtil } from './common/utility/path.utils';
import { ServeStaticMiddleware } from './serve-static-middleware';
import { NestExpressApplication } from '@nestjs/platform-express';

const port = process.env['PORT'] || 5000;

async function bootstrap() {
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);

    // ✅ Updated CORS Configuration - Environment-based and more secure
    const corsOptions = {
        origin: process.env['NODE_ENV'] === 'production'
            ? [
                'https://geo-whiz.onrender.com',
                // Add any other production domains you might have
            ]
            : [
                'http://localhost:3000',  // React dev server (CRA)
                'http://localhost:5173',  // Vite dev server
                'http://localhost:3001',  // Alternative React port
            ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'Origin',
            'X-Requested-With'
        ],
    };

    app.enableCors(corsOptions);

    // Set a global prefix for all API routes
    app.setGlobalPrefix("api");

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

    // Swagger documentation
    const config = new DocumentBuilder()
        .setTitle('geo-whiz API')
        .setDescription('The geo-whiz API documentation')
        .setVersion('1.0')
        .addTag('countries')
        .addTag('quiz')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(port);
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env['NODE_ENV'] || 'development'}`);
    console.log(`CORS enabled for: ${corsOptions.origin}`);

    // Optional: Log the static assets path for debugging
    console.log(`Static assets path: ${PathUtil.getStaticAssetsPath()}`);
}

bootstrap().catch(err => {
    console.error('Error starting server:', err);
    process.exit(1);
});