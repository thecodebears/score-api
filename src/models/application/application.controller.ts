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
import { Permissions } from 'src/security/permissions/permissions';
import { ApplicationIndexationPipe } from './validation/pipes/indexation.pipe';
import { ApplicationCreateDto } from './validation/dto/create.dto';
import { ApplicationUpdateDto } from './validation/dto/update.dto';


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

    @Post('search')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async search() {
        // Waiting for search engine.
        throw new HttpException('method.notImplemented', 400);
    }

    @Post('update')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async update(
        @Query('id', ParseUUIDPipe, ApplicationIndexationPipe) application,
        @Query() overrideFields: ApplicationUpdateDto,
        @Response({ passthrough: true }) res
    ) {
        let updated = await this.applicationService.update(application, overrideFields);

        if (!updated) throw new HttpException('query.parameters.invalid', 500);

        return updated;
    }

    @Post('delete')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async delete(
        @Query() { id }: ModelDeleteRequest,
        @Response({ passthrough: true }) res
    ) {
        let application = await this.applicationService.findOneBy({ id });

        if (!application) throw new HttpException('application.entity.notFound', 404);

        await this.applicationService.remove(application);

        res.status(200);
    }

    @Post('create')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async new(@Query() { name, description, permissions }: ApplicationCreateDto) {
        if (!Permissions.validatePermissions(permissions)) throw new HttpException('query.permissions.invalid', 400);
        
        return this.applicationService.new(name, description, permissions);
    }

    @Post('authorize')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async authorize(@Query('id', ParseUUIDPipe, ApplicationIndexationPipe) application) {
        return { token: this.applicationService.authorize(application) }
    }
}
