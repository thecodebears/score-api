import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from './account.entity';
import { EntityService } from '../base.service';
import { JwtService } from "@nestjs/jwt";
import { RegistrationResponse } from "./account.types";
import { ConnectionService } from "../connection/connection.service";


@Injectable()
export class AccountService extends EntityService<Account> {
    constructor(
        @InjectRepository(Account) protected readonly repository: Repository<Account>,
        private jwtService: JwtService
    ) {
        super();
    }

    /*
     * Grants JWT token for access.
     */
    public authorize(account: Account): string {
        let payload = {
            scope: 'account',
            id: account.id,
            admin: account.admin,
            timestamp: Date.now()
        };

        return this.jwtService.sign(payload);
    }

    public async register(name: string, password: string): Promise<RegistrationResponse> {
        try {
            let passwordHash = bcrypt.hashSync(password, 10);
            let account = await this.create({ name, password: passwordHash });
            let token = this.authorize(account);

            return { account, token };
        } catch(e) {
            return null;
        }
    }
}