import { Controller, UseGuards, Request, Response, Post, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/localAuth.guard';
import { DiscordAuthGuard } from './guard/discordAuth.guard';
import { RegisterDto, CodeAuthorizationDto } from './auth.types';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    public async login(@Request() req) {
        return { token: this.authService.authorize(req.user) };
    }

    @Post('register')
    public async register(@Query() { username, password }: RegisterDto) {
        await this.authService.register(username, password);
    }

    @Get('discord')
    @UseGuards(DiscordAuthGuard)
    public async discordLogin() {
        return;
    }

    @Get('discord/callback')
    @UseGuards(DiscordAuthGuard)
    public async discordCallback(@Request() req) {
        return { token: this.authService.authorize(req.user) };
    }
}
