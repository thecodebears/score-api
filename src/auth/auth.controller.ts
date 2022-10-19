import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DiscordAuthGuard } from '../guard/discordAuth.guard';
import { AccountService } from 'src/models/account/account.service';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private accountService: AccountService
    ) {}

    @Get('discord')
    @UseGuards(DiscordAuthGuard)
    public async discordLogin() {
        return;
    }

    @Get('discord/callback')
    @UseGuards(DiscordAuthGuard)
    public async discordCallback(@Request() req) {
        return { token: this.accountService.signIn(req.user) };
    }
}
