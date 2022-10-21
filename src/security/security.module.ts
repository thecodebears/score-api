import { Module } from "@nestjs/common";
import { ApplicationModule } from "src/models/application/application.module";
import { AdminGuard } from "./guards/admin.guard";
import { DiscordAuthGuard } from "./guards/discordAuth.guard";
import { AccountJwtGuard, ApplicationJwtGuard } from "./guards/jwt.guard";
import { LocalAuthGuard } from "./guards/localAuth.guard";
import { PermissionsGuard } from "./guards/permissions.guard";
import { DiscordStrategy } from "./strategies/discord.strategy";
import { AccountJwtStrategy, ApplicationJwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";


@Module({
    imports: [
        ApplicationModule
    ],
    providers: [
        AdminGuard,
        DiscordAuthGuard,
        AccountJwtGuard,
        ApplicationJwtGuard,
        LocalAuthGuard,
        PermissionsGuard,

        DiscordStrategy,
        AccountJwtStrategy,
        ApplicationJwtStrategy,
        LocalStrategy
    ]
})
export class SecurityModule {}
