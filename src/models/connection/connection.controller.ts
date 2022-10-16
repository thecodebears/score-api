import * as url from 'url';
import { Controller, Get, Post, Query, Res, Response, Header, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConnectionService } from './connection.service';
import { Connection } from './connection.entity';
import { AccountService } from '../account/account.service';
import { Account } from '../account/account.entity';
import { DiscordConnectDto } from './connection.dto';
import { APIError } from '../../utils/error';
import { config } from 'config';


@Controller('connect')
export class ConnectionController {
    constructor(
            private connectionService: ConnectionService,
            private accountService: AccountService,
            private httpService: HttpService
    ) {}

    @Get('discord')
    @Header('content-type', 'text/json')
    public async connect(@Response({ passthrough: true }) response, @Query() params: DiscordConnectDto) {
        const { code, accountId } = params;

        const discordProfile = await this.connectionService.identifyDiscordProfile(code);
        if (!discordProfile) throw new HttpException('Authorization failed.', 400);

        let connectionPair = await this.connectionService.connect({
            type: 'discord',
            key: discordProfile.id,
            placeholderName: discordProfile.username,
            ...(accountId && { accountId })
        });
        if (!connectionPair) throw new HttpException('Connection failed. Check your accountId parameter.', 400);

        return connectionPair;
    }

    @Get('discord/url')
    public async discordAuthorizationURL() {
        return config.credentials.discord.applicationRedirectURL;
    }
}
