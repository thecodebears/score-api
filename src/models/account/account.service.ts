import * as bcrypt from 'bcrypt';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from './account.entity';
import { ModelService } from '../model.service';
import { JwtService } from "@nestjs/jwt";
import { SignUpResponse } from "./account.types";
import { ConnectionPlatform } from './connection/connection.types';
import { ConnectionService } from './connection/connection.service';
import { Columns } from '../model.types';


@Injectable()
export class AccountService extends ModelService<Account> {
    constructor(
        @InjectRepository(Account) protected readonly repository: Repository<Account>,
        private connectionService: ConnectionService,
        private jwtService: JwtService
    ) {
        super();
    }

    public signIn(account: Account): string {
        let payload = {
            scope: 'account',
            id: account.id,
            password: account.password,
            admin: account.admin,
            timestamp: Date.now()
        };

        return this.jwtService.sign(payload);
    }

    public async signUp(name: string, password: string): Promise<SignUpResponse> {
        let passwordHash = bcrypt.hashSync(password, 10);
        let account = await this.create({ name, password: passwordHash });
        let token = this.signIn(account);

        return { account, token };
    }

    /*
     * Used to authorization from trusted platforms.
     */
    public async connect(platform: ConnectionPlatform, key: string, name: string): Promise<Account> {
        let connection = await this.connectionService.findOneBy({ key, platform });

        if (!connection) {
            let password = Math.random().toString(16).slice(2);
            let { account } = await this.signUp(name, password);

            await this.connectionService.create({ platform: 'discord', key, account: account.id });

            return account;
        } else {
            return this.findOneBy({ id: connection.account });
        }
    }

    /*
     * In some cases, we need to re-signup in cause of password change.
     * This overrided method do that.
     */
    public async _update(account: Account, { password, ...otherFields }: Columns<Account>) {
        let updated = await this.update(account, {
            ...(password && { password: bcrypt.hashSync(password, 10) }),
            ...otherFields
        });

        return {
            ...updated,
            ...(password && { token: this.signIn(account) })
        };
    }
}