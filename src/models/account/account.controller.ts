import { Controller, HttpException, Query, UseGuards, Post, Get, Param, Response } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountJwtGuard } from '../../auth/guard/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { AdminGuard } from '../../auth/guard/admin.guard';
import { UpdateAccountDto, GetAccountDto } from './account.types';


@Controller('account')
export class AccountController {
    constructor(
        private accountService: AccountService,
        private jwtService: JwtService
    ) {}

    @Get()
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async getAccountData(@Query() { id, fields }: GetAccountDto) {
        const account = await this.accountService.findOneBy({ id });
        if (!account) throw new HttpException('Account not found.', 404);
        return fields ? account.pick(fields?.split(/\,/g)) : account;
    }

    @Post('update')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async updateAccountData(
        @Query() { id, ...override }: UpdateAccountDto,
        @Response({ passthrough: true }) res
    ) {
        let account = await this.accountService.findOneBy({ id });
        if (!account) throw new HttpException('Account not found.', 404);

        let updateResult = await this.accountService.update(account, override)
        if (!updateResult) throw new HttpException('Failed to update account. Check your parameters, it may be incorrect.', 500);

        res.status(200);
    }
}
