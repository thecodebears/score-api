import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionService } from './connection.service';
import { Connection } from './connection.entity';


@Module({
    imports: [ TypeOrmModule.forFeature([ Connection ]) ],
    providers: [ ConnectionService ],
    controllers: [],
    exports: [ ConnectionService ]
})
export class ConnectionModule {}