import { Controller, HttpException, Query, UseGuards, Post, Get, Param, Response } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { AccountJwtGuard } from '../../auth/guard/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { AdminGuard } from '../../auth/guard/admin.guard';
import {
    CreateApplicationDto,
    AuthorizeApplicationDto,
    UpdateApplicationDto,
    GetApplicationDto
} from './application.types';


@Controller('application')
export class ApplicationController {
    constructor(
        private applicationService: ApplicationService,
        private jwtService: JwtService
    ) {}

    @Post('create')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async createApplication(@Query() { name, description, permissions }: CreateApplicationDto) {
        let application = await this.applicationService.create({
            name,
            description,
            permissions: permissions.split(/\s/g)
        });

        return application;
    }

    @Get()
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async getApplicationData(@Query() { id, fields }: GetApplicationDto) {
        const application = await this.applicationService.findOneBy({ id });
        if (!application) throw new HttpException('Application not found.', 404);
        return fields ? application.pick(fields?.split(/\,/g)) : application;
    }

    @Post('authorize')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async authorizeApplication(@Query() { id }: AuthorizeApplicationDto) {
        let token = await this.applicationService.authorize(id);
        if (!token) throw new HttpException('Application not found.', 404);

        return { token };
    }

    @Post('update')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async updateApplicationData(
        @Query() { id, ...override }: UpdateApplicationDto,
        @Response({ passthrough: true }) res
    ) {
        let application = await this.applicationService.findOneBy({ id });
        if (!application) throw new HttpException('Application not found.', 404);

        let updateResult = await this.applicationService.update(application, override)
        if (!updateResult) throw new HttpException('Failed to update application. Check your parameters, it may be incorrect.', 500);

        res.status(200);
    }

    // TODO: Implement update routing for each field
    // TODO: Migrate HttpException's to Pipe classes (from all cases)
}
