import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from './application.service';
import { Application } from './application.entity';
import { ApplicationController } from './application.controller';
import { JwtModule } from '@nestjs/jwt';
import env from 'environment';


@Module({
    imports: [
        TypeOrmModule.forFeature([ Application ]),
        JwtModule.register({
            secret: env.security.jwt.secret
        })
    ],
    providers: [ ApplicationService ],
    controllers: [ ApplicationController ],
    exports: [ ApplicationService ]
})
export class ApplicationModule {}