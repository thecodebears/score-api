import { Controller, HttpException, Query, UseGuards, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { AccountJwtGuard } from '../../auth/guard/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { AdminGuard } from '../../auth/guard/admin.guard';
import { CreateApplicationDto, AuthorizeApplicationDto } from './application.types';


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

    @Post('authorize')
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async authorizeApplication(@Query() { id }: AuthorizeApplicationDto) {
        let token = await this.applicationService.authorize(id);
        if (!token) throw new HttpException('Application not found.', 404);

        return { token };
    }
}
