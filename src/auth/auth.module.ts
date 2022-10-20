import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountModule } from '../models/account/account.module';
import { ApplicationModule } from '../models/application/application.module';
import { ConnectionModule } from '../models/connection/connection.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/local.strategy';
import { AccountJwtStrategy, ApplicationJwtStrategy } from '../strategies/jwt.strategy';
import { DiscordStrategy } from '../strategies/discord.strategy';
import { JwtModule } from '@nestjs/jwt';
import { SessionSerializer } from './serializer';
import env from 'environment';


@Module({
    imports: [
        AccountModule,
        ConnectionModule,
        PassportModule,
        ApplicationModule,
        JwtModule.register({
            secret: env.security.jwt.secret
        })
    ],
    controllers: [ AuthController ],
    providers: [
        AuthService,
        LocalStrategy,
        AccountJwtStrategy,
        ApplicationJwtStrategy,
        DiscordStrategy,
        SessionSerializer
    ]
})
export class AuthModule {}
