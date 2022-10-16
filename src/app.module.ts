import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ApplicationModule } from './models/application/application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import ormConfig from 'ormconfig';


@Module({
    imports: [
        AuthModule,
        ApplicationModule,
        TypeOrmModule.forRoot(ormConfig)
    ],
    controllers: [ AppController ],
    providers: [ AppService ]
})
export class AppModule {}
