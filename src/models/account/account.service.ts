import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from './account.entity';
import { ModelService } from '../model.service';
import { JwtService } from "@nestjs/jwt";
import { SignUpResponse } from "./account.types";


@Injectable()
export class AccountService extends ModelService<Account> {
    constructor(
        @InjectRepository(Account) protected readonly repository: Repository<Account>,
        private jwtService: JwtService
    ) {
        super();
    }

    public signIn(account: Account): string {
        let payload = {
            scope: 'account',
            id: account.id,
            admin: account.admin,
            timestamp: Date.now()
        };

        return this.jwtService.sign(payload);
    }

    public async signUp(name: string, password: string): Promise<SignUpResponse> {
        try {
            let passwordHash = bcrypt.hashSync(password, 10);
            let account = await this.create({ name, password: passwordHash });
            let token = this.signIn(account);

            return { account, token };
        } catch(e) {
            return null;
        }
    }
}