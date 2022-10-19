import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Application } from './application.entity';
import { JwtService } from '@nestjs/jwt';
import { ModelService } from "../model.service";
import { NewActionResponse } from "./application.types";


@Injectable()
export class ApplicationService extends ModelService<Application> {
    constructor(
        @InjectRepository(Application) protected readonly repository: Repository<Application>,
        private jwtService: JwtService
    ) {
        super();
    }

    public async new(name: string, description: string, permissions: string[]): Promise<NewActionResponse> {
        try {
            let application = await this.create({ name, description, permissions });
            let token = this.authorize(application);

            return { application, token };
        } catch(e) {
            return null;
        }
    }

    public authorize(application: Application): string {
        let payload = {
            scope: 'application',
            id: application.id,
            permissions: application.permissions,
            timestamp: Date.now()
        };

        return this.jwtService.sign(payload);
    }
}