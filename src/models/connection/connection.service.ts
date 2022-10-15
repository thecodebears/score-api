import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Connection } from './connection.entity';
import { EntityService } from '../base.service';


@Injectable()
export class ConnectionService extends EntityService<Connection> {
    constructor(@InjectRepository(Connection) protected readonly repository: Repository<Connection>) {
        super();
    }
}