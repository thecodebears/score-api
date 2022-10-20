import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AccountJwtGuard, ApplicationJwtGuard } from './guard/jwt.guard';
import { AdminGuard } from './guard/admin.guard';
import { PermissionsGuard } from './guard/permissions.guard';


@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
}
