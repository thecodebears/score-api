import * as url from 'url';
import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Connection } from './connection.entity';
import { EntityService } from '../base.service';
import { AccountService } from '../account/account.service';
import { Account } from '../account/account.entity';


@Injectable()
export class ConnectionService extends EntityService<Connection> {
    constructor(
        @InjectRepository(Connection) protected readonly repository: Repository<Connection>
    ) {
        super();
    }
}