import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Application } from './user.entity';
import { EntityService } from '../base.service';


@Injectable()
export class UserService extends EntityService<User> {
    constructor(@InjectRepository(User) protected readonly repository: Repository<User>) {
        super();
    }
}