import { Profile, Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AccountService } from '../../models/account/account.service';
import { Account } from '../../models/account/account.entity';
import env from 'environment';


@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'Discord') {
    constructor(
        private accountService: AccountService
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

        return this.accountService.connect('discord', id, username);
    }
}