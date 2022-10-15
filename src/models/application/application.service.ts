import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Application } from './application.entity';
import { EntityService } from '../base.service';


@Injectable()
export class ApplicationService extends EntityService<Application> {
    constructor(@InjectRepository(Application) protected readonly repository: Repository<Application>) {
        super();
    }
}