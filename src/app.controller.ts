import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AccountJwtGuard, ApplicationJwtGuard } from './guards/jwt.guard';
import { AdminGuard } from './guards/admin.guard';
import { PermissionsGuard } from './guards/permissions.guard';


@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
}
