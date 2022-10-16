import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AccountJwtGuard, ApplicationJwtGuard } from './auth/guard/jwt.guard';
import { AdminGuard } from './auth/guard/admin.guard';


@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('ping')
    ping(): string {
        return 'PONG';
    }

    @Get('test/account')
    @UseGuards(AccountJwtGuard)
    accountTest(): string {
        return ':3';
    }

    @Get('test/admin')
    @UseGuards(AccountJwtGuard, AdminGuard)
    adminTest(): string {
        return ':3';
    }

    @Get('test/application')
    @UseGuards(ApplicationJwtGuard)
    applicationTest(): string {
        return ':3';
    }
}
