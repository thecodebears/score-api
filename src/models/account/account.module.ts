import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { AccountController } from './account.controller'
import { Account } from './account.entity';
import { JwtModule } from '@nestjs/jwt';
import env from 'environment';
import { Connection } from './connection/connection.entity';
import { DiscordStrategy } from 'src/security/strategies/discord.strategy';
import { SessionSerializer } from 'src/utils/serializer/serializer';
import { ConnectionService } from './connection/connection.service';
import { SecurityModule } from 'src/security/security.module';


@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([ Account, Connection ]),
        JwtModule.register({
            secret: env.security.jwt.secret
        }),
        SecurityModule
    ],
    providers: [
        AccountService,
        ConnectionService,
        DiscordStrategy,
        SessionSerializer
    ],
    controllers: [ AccountController ],
    exports: [ AccountService ]
})
export class AccountModule {}