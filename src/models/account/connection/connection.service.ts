import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ModelService } from '../../model.service';
import { Repository } from "typeorm";
import { Connection } from './connection.entity';


@Injectable()
export class ConnectionService extends ModelService<Connection> {
    constructor(
        @InjectRepository(Connection) protected readonly repository: Repository<Connection>,
    ) {
        super();
    }
}