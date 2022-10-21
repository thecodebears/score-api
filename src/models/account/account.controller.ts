import { Controller, HttpException, Query, UseGuards, Post, Get, Response, Request, UsePipes, ParseUUIDPipe } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountJwtGuard, ApplicationJwtGuard } from '../../security/guards/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { AdminGuard } from '../../security/guards/admin.guard';
import {
    ModelDeleteRequest,
    ModelGetRequest,
    ModelUpdateRequest
} from "../model.types";
import { Account } from './account.entity';
import { AccountSignUpRequest } from './account.types';
import { LocalAuthGuard } from 'src/security/guards/localAuth.guard';
import { SetPermissions, Permissions } from 'src/security/permissions/permissions';
import { DiscordAuthGuard } from 'src/security/guards/discordAuth.guard';
import { AccountIndexationPipe } from './validation/pipes/indexation.pipe';


@Controller('account')
export class AccountController {
    static {
        Permissions.enlistPermissionsGroup('account', [ 'get', 'create', 'update', 'delete' ]);
    }

    constructor(
        private accountService: AccountService,
        private jwtService: JwtService
    ) {}

    @Get()
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async get(
        @Query('id', ParseUUIDPipe, AccountIndexationPipe) account,
        @Query() { fields }: ModelGetRequest
    ) {
        return fields ? account.pick(fields?.split(/\,/g)) : account;
    }

    @Post('create')
    @SetPermissions('account.create')
    @UseGuards(ApplicationJwtGuard)
    public async create() {
        return 'Method is depcecated, see /account/signUp.'
    }

    @Post('search')
    @SetPermissions('account.get')
    @UseGuards(ApplicationJwtGuard)
    public async search() {
        // Waiting for search engine.
        return 'Not implemented.';
    }

    @Post('update')
    @SetPermissions('account.update')
    @UseGuards(ApplicationJwtGuard)
    public async update(
        @Query('id', ParseUUIDPipe, AccountIndexationPipe) account,
        @Query() overrideFields: ModelUpdateRequest<Account>,
        @Response({ passthrough: true }) res
    ) {
        let updateResult = await this.accountService.update(account, overrideFields);
        if (!updateResult) throw new HttpException('Failed to update account. Check your parameters, it may be incorrect.', 500);

        res.status(200);
    }

    @Post('delete')
    @SetPermissions('account.delete')
    @UseGuards(ApplicationJwtGuard)
    public async delete(
        @Query('id', ParseUUIDPipe, AccountIndexationPipe) account,
        @Response({ passthrough: true }) res
    ) {
        await this.accountService.remove(account);
        res.status(200);
    }

    @Post('signup')
    @SetPermissions('account.create')
    @UseGuards(ApplicationJwtGuard)
    public async signUp(@Query() { username, password }: AccountSignUpRequest) {
        return this.accountService.signUp(username, password);
    }

    @Post('signin')
    @SetPermissions('account.get')
    @UseGuards(ApplicationJwtGuard, LocalAuthGuard)
    public async signIn(@Request() req) {
        return { token: this.accountService.signIn(req.user) };
    }

    @Get('signin/discord')
    @UseGuards(DiscordAuthGuard)
    public async discordLogin() {
        return;
    }

    @Get('signin/discord/callback')
    @UseGuards(DiscordAuthGuard)
    public async discordCallback(@Request() req) {
        return { token: this.accountService.signIn(req.user) };
    }
}
