import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import env from 'environment';
import * as session from 'express-session';
import * as passport from 'passport';


async function bootstrap() {
    // Powering by Fastify
    // const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    // Powering by Express
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.use(session({
        secret: env.security.session.secret,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(env.port);
}

bootstrap();
