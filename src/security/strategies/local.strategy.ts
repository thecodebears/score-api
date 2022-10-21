import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Query } from '@nestjs/common';
import { AccountService } from '../../models/account/account.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'Local') {
    constructor(
        private accountService: AccountService
    ) {
        super();
    }

    async validate(name: string, password: string): Promise<any> {
        let account = await this.accountService.findOneBy({ name });
        if (!account || !bcrypt.compareSync(password, account.password)) throw new UnauthorizedException();
        return account;
    }
}