import { Controller, HttpException, Query, UseGuards, Post, Get, Response } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { AccountJwtGuard } from '../../guard/jwt.guard';
import { AdminGuard } from '../../guard/admin.guard';
import {
    ModelCreateRequest,
    ModelDeleteRequest,
    ModelGetRequest, ModelIndexationRequest,
    ModelSearchRequest,
    ModelUpdateRequest
} from '../model.types';
import { Application } from './application.entity';
import { ApplicationNewRequest } from './application.types';


@Controller('application')
export class ApplicationController {
    constructor(
        private applicationService: ApplicationService
    ) {}

    @Get()
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async get(@Query() { id, fields }: ModelGetRequest) {
        const application = await this.applicationService.findOneBy({ id });
        if (!application) throw new HttpException('Application not found.', 404);
        return fields ? application.pick(fields?.split(/\,/g)) : application;
    }

    @Post('create')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async create(@Query() fields: ModelCreateRequest<Application>) {
        return this.applicationService.create(fields);
    }

    @Post('search')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async search(@Query() { id, ...searchFields }: ModelSearchRequest<Application>) {
        const applications = await this.applicationService.findBy(searchFields);
        if (!applications.length) throw new HttpException('No results.', 404);
        return { applications };
    }

    @Post('update')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async update(
        @Query() { id, ...overrideFields }: ModelUpdateRequest<Application>,
        @Response({ passthrough: true }) res
    ) {
        let application = await this.applicationService.findOneBy({ id });
        if (!application) throw new HttpException('Application not found.', 404);

        let updateResult = await this.applicationService.update(application, overrideFields);
        if (!updateResult) throw new HttpException('Failed to update application. Check your parameters, it may be incorrect.', 500);

        res.status(200);
    }

    @Post('delete')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async delete(
        @Query() { id }: ModelDeleteRequest,
        @Response({ passthrough: true }) res
    ) {
        let application = await this.applicationService.findOneBy({ id });
        if (!application) throw new HttpException('Application not found.', 404);

        await this.applicationService.remove(application);

        res.status(200);
    }

    /*
     * Creates entity instances as /create, but do authorization as well.
     */
    @Post('new')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async new(@Query() { name, description, permissions }: ApplicationNewRequest) {
        return this.applicationService.new(name, description, permissions.split(/\,/g));
    }

    @Post('authorize')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async authorize(@Query() { id }: ModelIndexationRequest) {
        let application = await this.applicationService.findOneBy({ id });
        if (!application) throw new HttpException('Application not found.', 404);
        return { token: this.applicationService.authorize(application) }
    }
}
