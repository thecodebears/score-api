import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { Account } from './account.entity';


@Module({
    imports: [ TypeOrmModule.forFeature([ Account ]) ],
    providers: [ AccountService ],
    controllers: [],
    exports: [ AccountService ]
})
export class AccountModule {}