import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Application } from './account.entity';
import { EntityService } from '../base.service';


@Injectable()
export class AccountService extends EntityService<Account> {
    constructor(@InjectRepository(Account) protected readonly repository: Repository<Account>) {
        super();
    }
}