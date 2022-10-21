import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AccountService } from '../../models/account/account.service';
import { Account } from '../../models/account/account.entity';
import { Done } from './serializer.types';


@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        private readonly accountService: AccountService
    ) {
        super();
    }

    public serializeUser(details: Account, done: Done<Account>) {
        done(null, details);
    }

    public async deserializeUser(details: Account, done: Done<Account>) {
        const account = await this.accountService.findOneBy({ id: details.id });
        return account ? done(null, account) : done(null, null);
    }
}