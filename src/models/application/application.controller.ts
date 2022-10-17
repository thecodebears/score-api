import { Controller, HttpException, Query, UseGuards, Post, Get, Param } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { AccountJwtGuard } from '../../auth/guard/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { AdminGuard } from '../../auth/guard/admin.guard';
import {
    CreateApplicationDto,
    AuthorizeApplicationDto,
    UpdateApplicationDto,
    GetApplicationDataDto
} from './application.types';


@Controller('application')
export class ApplicationController {
    constructor(
        private applicationService: ApplicationService,
        private jwtService: JwtService
    ) {}

    @Get(':id')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async getApplicationData(
        @Param('id') id: string,
        @Query() { fields }: GetApplicationDataDto
        ) {
        const entity = await this.applicationService.findOneBy({ id });
        const neededFields = fields.reduce((a, b) => b in entity? Object.assign(a, { [b]: entity[b] }): a, {})

        return neededFields
    }

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

    @Post('authorize')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async authorizeApplication(@Query() { id }: AuthorizeApplicationDto) {
        let token = await this.applicationService.authorize(id);
        if (!token) throw new HttpException('Application not found.', 404);

        return { token };
    }

    @Post('update')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async updateApplicationData(@Query() { id, ...override }: UpdateApplicationDto) {
        let entity = await this.applicationService.findOneBy({ id })
        let isOk = await this.applicationService.update(entity, override)
        if(!isOk) throw new HttpException('Entity update fault', 500);

        return { status: 'OK' }
    }

    //implement permissions update route
}
