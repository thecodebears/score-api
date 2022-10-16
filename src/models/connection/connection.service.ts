import * as url from 'url';
import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Connection } from './connection.entity';
import { ConnectionType, ConnectionTypes, DiscordAccount, ConnectionRequest, ConnectionPair } from './connection.types';
import { EntityService } from '../base.service';
import { AccountService } from '../account/account.service';
import { Account } from '../account/account.entity';
import { config } from 'config';


@Injectable()
export class ConnectionService extends EntityService<Connection> {
    constructor(
        @InjectRepository(Connection) protected readonly repository: Repository<Connection>,
        private accountService: AccountService,
        private httpService: HttpService
    ) {
        super();
    }

    public async connect(parameters: ConnectionRequest): Promise<ConnectionPair> {
        const { type, key, placeholderName, accountId } = parameters;
        let connection: Connection = await this.findOneBy({ type, key });

        if (connection) return {
            account: connection.account,
            connection: connection.id
        };

        if (accountId) {
            if (!(await this.accountService.findOneBy({ id: accountId }))) return null;

            connection = await this.create({ type, key, account: accountId });

            return {
                account: accountId,
                connection: connection.id
            };
        } else {
            let account = await this.accountService.create({ name: placeholderName });
            connection = await this.create({ type, key, account: account.id });

            return {
                account: account.id,
                connection: connection.id
            };
        }
    }

    public async identifyDiscordProfile(code: string): Promise<DiscordAccount> {
        let { applicationClientId, applicationClientSecret, applicationConfirmURL } = config.credentials.discord;

        try {
            let tokenRequest = await this.httpService.axiosRef.post(
                 'https://discord.com/api/v8/oauth2/token',
                 new url.URLSearchParams({
                     client_id: applicationClientId,
                     client_secret: applicationClientSecret,
                     redirect_uri: applicationConfirmURL,
                     grant_type: 'authorization_code',
                     code: code.toString()
                 }).toString(),
                 { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
             );

             let { access_token, token_type } = tokenRequest.data;

             let userRequest = await this.httpService.axiosRef.get(
                 'https://discord.com/api/v10/users/@me',
                 { headers: { 'Authorization': `${token_type} ${access_token}` } }
             );

            return userRequest.data;
        } catch(e) {
            return null;
        }
    }

    // TODO: implement
    public identifyVKAccount(): string {
        return '';
    }

    // TODO: implement
    public identifyGoogleAccount(token: string): string {
        return '';
    }
}