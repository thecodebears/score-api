import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Application } from './application.entity';
import { EntityService } from '../base.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class ApplicationService extends EntityService<Application> {
    constructor(
        @InjectRepository(Application) protected readonly repository: Repository<Application>,
        private jwtService: JwtService
    ) {
        super();
    }

    public async authorize(id: string): Promise<string> {
        let application = await this.findOneBy({ id });
        if (!application) return '';

        let payload = {
            scope: 'application',
            id: application.id,
            permissions: application.permissions,
            timestamp: Date.now()
        };

        return this.jwtService.sign(payload);
    }
}