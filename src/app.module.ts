import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ApplicationModule } from './models/application/application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { ConnectionModule } from './models/connection/connection.module';
import { ProductModule } from './models/product/product.module';


@Module({
    imports: [
        AuthModule,
        ApplicationModule,
        ConnectionModule,
        ProductModule,
        TypeOrmModule.forRoot(ormConfig)
    ],
    controllers: [ AppController ],
    providers: [ AppService ]
})
export class AppModule {}
