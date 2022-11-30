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
import { ItemModule } from '../item/item.module';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { Order } from './order/order.entity';


@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([ Account, Connection, Order ]),
        JwtModule.register({
            secret: env.security.jwt.secret
        }),
        SecurityModule,
        ItemModule
    ],
    providers: [
        AccountService,
        ConnectionService,
        OrderService,
        DiscordStrategy,
        SessionSerializer
    ],
    controllers: [
        AccountController,
        OrderController
    ],
    exports: [ AccountService ]
})
export class AccountModule {}