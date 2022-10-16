import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConnectionService } from './connection.service';
import { Connection } from './connection.entity';
import { ConnectionController } from './connection.controller';
import { AccountModule } from '../account/account.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ Connection ]),
        AccountModule,
        HttpModule
    ],
    providers: [ ConnectionService ],
    controllers: [ ConnectionController ]
})
export class ConnectionModule {}
