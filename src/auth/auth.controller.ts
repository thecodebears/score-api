import { Controller, UseGuards, Request, Response, Post, Get, Query, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/localAuth.guard';
import { DiscordAuthGuard } from './guard/discordAuth.guard';
import { RegisterDto, CodeAuthorizationDto } from './auth.types';
import { AccountService } from 'src/models/account/account.service';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private accountService: AccountService
    ) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    public async login(@Request() req) {
        return { token: this.accountService.authorize(req.user) };
    }

    @Post('register')
    public async register(@Query() { username, password }: RegisterDto) {
        let registerResponse = await this.accountService.register(username, password);
        if (!registerResponse) throw new HttpException('Cannot create an account. The most likely reason - username is busy.', 400);
        return registerResponse;
    }

    @Get('discord')
    @UseGuards(DiscordAuthGuard)
    public async discordLogin() {
        return;
    }

    @Get('discord/callback')
    @UseGuards(DiscordAuthGuard)
    public async discordCallback(@Request() req) {
        return { token: this.accountService.authorize(req.user) };
    }
}
