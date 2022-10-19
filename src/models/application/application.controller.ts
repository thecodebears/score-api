import { Controller, HttpException, Query, UseGuards, Post, Get, Response } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { AccountJwtGuard } from '../../auth/guard/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { AdminGuard } from '../../auth/guard/admin.guard';
import {
    ModelCreateRequest,
    ModelDeleteRequest,
    ModelGetRequest, ModelIndexationRequest,
    ModelSearchRequest,
    ModelUpdateRequest
} from '../model.types';
import { Permissions } from '../../decorators/permissions.decorator';
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
        const account = await this.applicationService.findOneBy({ id });
        if (!account) throw new HttpException('Application not found.', 404);
        return fields ? account.pick(fields?.split(/\,/g)) : account;
    }

    @Post('create')
    @Permissions('application.create')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async create(@Query() fields: ModelCreateRequest<Application>) {
        return this.applicationService.create(fields);
    }

    @Post('search')
    @Permissions('application.search')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async search(@Query() { id, ...searchFields }: ModelSearchRequest<Application>) {
        const accounts = await this.applicationService.findBy(searchFields);
        if (!accounts.length) throw new HttpException('No results.', 404);
        return { accounts };
    }

    @Post('update')
    @Permissions('application.update')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async update(
        @Query() { id, ...overrideFields }: ModelUpdateRequest<Application>,
        @Response({ passthrough: true }) res
    ) {
        let account = await this.applicationService.findOneBy({ id });
        if (!account) throw new HttpException('Application not found.', 404);

        let updateResult = await this.applicationService.update(account, overrideFields);
        if (!updateResult) throw new HttpException('Failed to update application. Check your parameters, it may be incorrect.', 500);

        res.status(200);
    }

    @Post('delete')
    @Permissions('application.delete')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async delete(
        @Query() { id }: ModelDeleteRequest,
        @Response({ passthrough: true }) res
    ) {
        let account = await this.applicationService.findOneBy({ id });
        if (!account) throw new HttpException('Application not found.', 404);

        await this.applicationService.remove(account);

        res.status(200);
    }

    @Post('new')
    @Permissions('application.signup')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async new(@Query() { name, description, permissions }: ApplicationNewRequest) {
        return this.applicationService.new(name, description, permissions.split(/\,/g));
    }

    @Post('authorize')
    @Permissions('application.signin')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async authorize(@Query() { id }: ModelIndexationRequest) {
        let application = await this.applicationService.findOneBy({ id });
        if (!application) throw new HttpException('Application not found.', 404);
        return { token: this.applicationService.authorize(application) }
    }
}
