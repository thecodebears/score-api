import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './models/application/application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { ProductModule } from './models/product/product.module';
import { AccountModule } from './models/account/account.module';


@Module({
    imports: [
        AccountModule,
        ApplicationModule,
        ProductModule,
        TypeOrmModule.forRoot(ormConfig)
    ],
    controllers: [ AppController ],
    providers: [ AppService ]
})
export class AppModule {}
