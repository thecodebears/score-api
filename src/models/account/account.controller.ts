import { Controller, HttpException, Query, UseGuards, Post, Get, Response, Request, UsePipes, ParseUUIDPipe } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountJwtGuard, ApplicationJwtGuard } from '../../security/guards/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { AdminGuard } from '../../security/guards/admin.guard';
import {
    ModelDeleteRequest,
    ModelGetRequest,
    ModelUpdateRequest
} from "../model.types";
import { Account } from './account.entity';
import { LocalAuthGuard } from 'src/security/guards/localAuth.guard';
import { SetPermissions, Permissions } from 'src/security/permissions/permissions';
import { DiscordAuthGuard } from 'src/security/guards/discordAuth.guard';
import { AccountIndexationPipe } from './validation/pipes/indexation.pipe';
import { ItemService } from '../item/item.service';
import { ItemIndexationPipe } from '../item/validation/pipes/indexation.pipe';
import { Item } from '../item/item.entity';
import { AccountCreateDto } from './validation/dto/create.dto';
import { AccountAddToCartDto } from './validation/dto/cart.dto';
import { AccountUpdateDto } from './validation/dto/update.dto';


@Controller('account')
export class AccountController {
    static {
        Permissions.enlistPermissionsGroup('account', [ 'get', 'create', 'update', 'delete' ]);
    }

    constructor(
        private accountService: AccountService,
        private itemService: ItemService,
        private jwtService: JwtService
    ) {}

    @Get()
    @UseGuards(AccountJwtGuard, AdminGuard)
    public async get(
        @Query('id', ParseUUIDPipe, AccountIndexationPipe) account,
        @Query() { fields }: ModelGetRequest
    ) {
        return fields ? account.pick(fields?.split(/\,/g)) : account;
    }

    @Post('search')
    @SetPermissions('account.get')
    @UseGuards(ApplicationJwtGuard)
    public async search() {
        // Waiting for search engine.
        throw new HttpException('method.notImplemented', 400);
    }

    @Post('create')
    @Post('signup')
    @SetPermissions('account.create')
    @UseGuards(ApplicationJwtGuard)
    public async signUp(@Query() { username, password }: AccountCreateDto) {
        return this.accountService.signUp(username, password);
    }

    @Post('update')
    @SetPermissions('account.update')
    @UseGuards(ApplicationJwtGuard)
    public async update(
        @Query('id', ParseUUIDPipe, AccountIndexationPipe) account,
        @Query() overrideFields: AccountUpdateDto
    ) {
        let updated = await this.accountService._update(account, overrideFields);
        
        if (!updated) throw new HttpException('query.parameters.invalid', 500);

        return updated;
    }

    @Post('delete')
    @SetPermissions('account.delete')
    @UseGuards(ApplicationJwtGuard)
    public async delete(
        @Query('id', ParseUUIDPipe, AccountIndexationPipe) account,
        @Response({ passthrough: true }) res
    ) {
        await this.accountService.remove(account);
        res.status(200);
    }

    @Post('signin')
    @SetPermissions('account.get')
    @UseGuards(LocalAuthGuard)
    public async signIn(@Request() req) {
        return { token: this.accountService.signIn(req.user) };
    }

    @Get('signin/discord')
    @UseGuards(DiscordAuthGuard)
    public async discordLogin() {
        return;
    }

    @Get('signin/discord/callback')
    @UseGuards(DiscordAuthGuard)
    public async discordCallback(@Request() req) {
        return { token: this.accountService.signIn(req.user) };
    }

    @Post('cart/add')
    @SetPermissions('account.update')
    @UseGuards(ApplicationJwtGuard)
    public async addToCart(
        @Query('id', ParseUUIDPipe, AccountIndexationPipe) account: Account,
        @Query('itemId', ItemIndexationPipe) item: Item,
        @Query() { count }: AccountAddToCartDto,
        @Response({ passthrough: true }) res
    ) {
        account.cart.push({
            id: item.id,
            count: count
        });
        await this.accountService.save(account);

        res.status(200);
    }

    @Post('cart/remove')
    @SetPermissions('account.update')
    @UseGuards(ApplicationJwtGuard)
    public async removeFromCart(
        @Query('id', ParseUUIDPipe, AccountIndexationPipe) account: Account,
        @Query('itemId', ItemIndexationPipe) item: Item,
        @Response({ passthrough: true }) res
    ) {
        if (!account.cart.some(p => p.id == item.id)) throw new HttpException('account.cart.element.notFound', 400);

        account.cart = account.cart.filter(e => e.id != item.id);
        
        await this.accountService.save(account);
        res.status(200);
    }

    @Post('cart/clear')
    @SetPermissions('account.update')
    @UseGuards(ApplicationJwtGuard)
    public async clearCart(
        @Query('id', ParseUUIDPipe, AccountIndexationPipe) account: Account,
        @Response({ passthrough: true }) res
    ) {
        account.cart = [];

        await this.accountService.save(account);
        res.status(200);
    }

    @Post('pins/add')
    @SetPermissions('account.update')
    @UseGuards(ApplicationJwtGuard)
    public async addToPins(
        @Query('id', ParseUUIDPipe, AccountIndexationPipe) account: Account,
        @Query('itemId', ItemIndexationPipe) item: Item,
        @Response({ passthrough: true }) res
    ) {
        account.pins.push(item.id);
        await this.accountService.save(account);
        await this.itemService.countAction(item, account.id, 'pin');
        res.status(200);
    }

    @Post('pins/remove')
    @SetPermissions('account.update')
    @UseGuards(ApplicationJwtGuard)
    public async removeFromPins(
        @Query('id', ParseUUIDPipe, AccountIndexationPipe) account: Account,
        @Query('itemId', ItemIndexationPipe) item: Item,
        @Response({ passthrough: true }) res
    ) {
        if (!account.pins.some(pid => pid == item.id)) throw new HttpException('account.pins.element.notFound', 400);

        account.pins = account.pins.filter(pid => pid != item.id);
        
        await this.accountService.save(account);
        res.status(200);
    }

    @Post('pins/clear')
    @SetPermissions('account.update')
    @UseGuards(ApplicationJwtGuard)
    public async clearPins(
        @Query('id', ParseUUIDPipe, AccountIndexationPipe) account: Account,
        @Response({ passthrough: true }) res
    ) {
        account.pins = [];

        await this.accountService.save(account);
        res.status(200);
    }
}
