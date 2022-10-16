import { Profile, Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AccountService } from '../../models/account/account.service';
import { Account } from '../../models/account/account.entity';
import { ConnectionService } from '../../models/connection/connection.service';
import env from 'environment';


@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'Discord') {
    constructor(
        private authService: AuthService,
        private accountService: AccountService,
        private connectionService: ConnectionService
    ) {
        super({
            clientID: env.credentials.discord.clientId,
            clientSecret: env.credentials.discord.clientSecret,
            callbackURL: env.credentials.discord.callbackUrl,
            scope: [ 'identify' ]
        });
    }

    public async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<Account> {
        let { id, username } = profile;
        let account = await this.authService.connect('discord', id, username);

        return account;
    }
}