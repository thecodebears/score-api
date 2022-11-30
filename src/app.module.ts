import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './models/application/application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { AccountModule } from './models/account/account.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/allExceptions.filter';
import { ItemModule } from './models/item/item.module';


@Module({
    imports: [
        AccountModule,
        ApplicationModule,
        ItemModule,
        TypeOrmModule.forRoot(ormConfig)
    ],
    controllers: [ AppController ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        AppService
    ]
})
export class AppModule {}
