import { Controller, HttpException, Query, UseGuards, Post, Get, Response, ParseUUIDPipe } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { AccountJwtGuard } from '../../security/guards/jwt.guard';
import { AdminGuard } from '../../security/guards/admin.guard';
import {
    ModelCreateRequest,
    ModelDeleteRequest,
    ModelGetRequest, ModelIndexationRequest,
    ModelSearchRequest,
    ModelUpdateRequest
} from '../model.types';
import { Application } from './application.entity';
import { ApplicationNewRequest } from './application.types';
import { Permissions } from 'src/security/permissions/permissions';
import { ApplicationIndexationPipe } from './validation/pipes/indexation.pipe';


@Controller('application')
export class ApplicationController {
    constructor(
        private applicationService: ApplicationService
    ) {}

    @Get()
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async get(
        @Query('id', ParseUUIDPipe, ApplicationIndexationPipe) application,
        @Query() { fields }: ModelGetRequest
    ) {
        return fields ? application.pick(fields?.split(/\,/g)) : application;
    }

    @Post('create')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async create() {
        return 'Method is deprecated, see /application/new.';
    }

    @Post('search')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async search() {
        // Waiting for search engine.
        return 'Not implemented.';
    }

    @Post('update')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async update(
        @Query('id', ParseUUIDPipe, ApplicationIndexationPipe) application,
        @Query() overrideFields: ModelUpdateRequest<Application>,
        @Response({ passthrough: true }) res
    ) {
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
        let permissionsList = permissions.split(/\,/g);
        if (!Permissions.validatePermissions(permissionsList)) throw new HttpException('Invalid permissions.', 400);
        return this.applicationService.new(name, description, permissionsList);
    }

    @Post('authorize')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async authorize(@Query('id', ParseUUIDPipe, ApplicationIndexationPipe) application) {
        return { token: this.applicationService.authorize(application) }
    }
}
