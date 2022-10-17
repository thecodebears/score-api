import { Controller, HttpException, Query, UseGuards, Post, Get, Param } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountJwtGuard } from '../../auth/guard/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { AdminGuard } from '../../auth/guard/admin.guard';
import { UpdateAccountDto, GetAccountDataDto } from './account.types';


@Controller('account')
export class AccountController {
    constructor(
        private accountService: AccountService,
        private jwtService: JwtService
    ) {}

    @Get(':id')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async getAccountData(
        @Param('id') id: string,
        @Query() { fields }: GetAccountDataDto
        ) {
        const entity = await this.accountService.findOneBy({ id });
        const neededFields = fields.reduce((a, b) => b in entity? Object.assign(a, { [b]: entity[b] }): a, {})

        return neededFields
    }

    @Post('update')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async updateAccountData(@Query() { id, ...override }: UpdateAccountDto) {
        let entity = await this.accountService.findOneBy({ id })
        let isOk = await this.accountService.update(entity, override)
        if(!isOk) throw new HttpException('Entity update fault', 500);

        return { status: 'OK' }
    }
}
