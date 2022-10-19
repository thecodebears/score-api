import { Injectable } from '@nestjs/common';
import { Account } from '../models/account/account.entity';
import { AccountService } from '../models/account/account.service';
import { ConnectionService } from '../models/connection/connection.service';
import { ConnectionPlatform } from '../models/connection/connection.types';


@Injectable()
export class AuthService {
    constructor(
        private connectionService: ConnectionService,
        private accountService: AccountService
    ) {}

    /*
     * Used to authorization from trusted platforms.
     */
    public async connect(platform: ConnectionPlatform, key: string, name: string): Promise<Account> {
        let connection = await this.connectionService.findOneBy({ platform, key });

        if (!connection) {
            let password = Math.random().toString(16).slice(2);
            let { account } = await this.accountService.signUp(name, password);

            await this.connectionService.create({ platform: 'discord', key, account: account.id });

            return account;
        } else {
            return this.accountService.findOneBy({ id: connection.account });
        }
    }
}
