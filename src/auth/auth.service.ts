import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { Account } from '../models/account/account.entity';
import { AccountService } from '../models/account/account.service';
import { ConnectionService } from '../models/connection/connection.service';
import { ConnectionPlatform } from '../models/connection/connection.types';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private accountService: AccountService,
        private connectionService: ConnectionService,
        private jwtService: JwtService
    ) {}

    /*
     * Grants JWT token for access.
     */
    public authorize(account: Account): string {
        let payload = {
            scope: 'account',
            id: account.id,
            timestamp: Date.now()
        };

        return this.jwtService.sign(payload);
    }

    public async register(name: string, password: string): Promise<Account> {
        let passwordHash = bcrypt.hashSync(password, 10);

        return this.accountService.create({ name, password: passwordHash });
    }

    /*
     * Used to authorization from trusted platforms.
     */
    public async connect(platform: ConnectionPlatform, key: string, name: string): Promise<Account> {
        let connection = await this.connectionService.findOneBy({ platform, key });
        let account: Account;

        if (!connection) {
            let password = Math.random().toString(16).slice(2);
            account = await this.register(name, password);
            await this.connectionService.create({ platform: 'discord', key, account: account.id });
        } else {
            account = await this.accountService.findOneBy({ id: connection.account });
        }

        return account;
    }
}
