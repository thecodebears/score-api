import { Controller, HttpException, Query, UseGuards, Post, Get, Response, Request } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountJwtGuard, ApplicationJwtGuard } from '../../guard/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { AdminGuard } from '../../guard/admin.guard';
import {
    ModelDeleteRequest,
    ModelGetRequest,
    ModelUpdateRequest
} from "../model.types";
import { Account } from './account.entity';
import { AccountSignUpRequest } from './account.types';
import { LocalAuthGuard } from 'src/guard/localAuth.guard';
import { SetPermissions, Permissions } from 'src/utils/permissions';


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
    public async get(@Query() { id, fields }: ModelGetRequest) {
        const account = await this.accountService.findOneBy({ id });
        if (!account) throw new HttpException('Account not found.', 404);
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
        @Query() { id, ...overrideFields }: ModelUpdateRequest<Account>,
        @Response({ passthrough: true }) res
    ) {
        let account = await this.accountService.findOneBy({ id });
        if (!account) throw new HttpException('Account not found.', 404);

        let updateResult = await this.accountService.update(account, overrideFields);
        if (!updateResult) throw new HttpException('Failed to update account. Check your parameters, it may be incorrect.', 500);

        res.status(200);
    }

    @Post('delete')
    @SetPermissions('account.delete')
    @UseGuards(ApplicationJwtGuard)
    public async delete(
        @Query() { id }: ModelDeleteRequest,
        @Response({ passthrough: true }) res
    ) {
        let account = await this.accountService.findOneBy({ id });
        if (!account) throw new HttpException('Account not found.', 404);

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
}
