import {Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { JwtModule } from '@nestjs/jwt';
import env from 'environment';


@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([ Account ]),
        JwtModule.register({
            secret: env.security.jwt.secret
        })
    ],
    providers: [ AccountService ],
    controllers: [],
    exports: [ AccountService ]
})
export class AccountModule {}