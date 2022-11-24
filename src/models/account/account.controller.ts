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
import { AccountAddToCartRequest, AccountSignUpRequest } from './account.types';
import { LocalAuthGuard } from 'src/security/guards/localAuth.guard';
import { SetPermissions, Permissions } from 'src/security/permissions/permissions';
import { DiscordAuthGuard } from 'src/security/guards/discordAuth.guard';
import { AccountIndexationPipe } from './validation/pipes/indexation.pipe';
import { ProductService } from '../product/product.service';
import { ProductIndexationPipe } from '../product/validation/pipes/indexation.pipe';
import { Product } from '../product/product.entity';


@Controller('account')
export class AccountController {
    static {
        Permissions.enlistPermissionsGroup('account', [ 'get', 'create', 'update', 'delete' ]);
    }

    constructor(
        private accountService: AccountService,
        private productService: ProductService,
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

    @Post('create')
    @SetPermissions('account.create')
    @UseGuards(ApplicationJwtGuard)
    public async create() {
        return 'Method is depcecated, see /account/signUp.'
    }

    @Post('search')
    @SetPermissions('account.get')
    @UseGuards(ApplicationJwtGuard)
    public async search() {
        // Waiting for search engine.
        return 'Not implemented.';
    }

    @Post('update')
    @SetPermissions('account.update')
    @UseGuards(ApplicationJwtGuard)
    public async update(
        @Query('id', ParseUUIDPipe, AccountIndexationPipe) account,
        @Query() overrideFields: ModelUpdateRequest<Account>,
        @Response({ passthrough: true }) res
    ) {
        let updateResult = await this.accountService.update(account, overrideFields);
        if (!updateResult) throw new HttpException('Failed to update account. Check your parameters, it may be incorrect.', 500);

        res.status(200);
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

    @Post('signup')
    @SetPermissions('account.create')
    @UseGuards(ApplicationJwtGuard)
    public async signUp(@Query() { username, password }: AccountSignUpRequest) {
        return this.accountService.signUp(username, password);
    }

    @Post('signin')
    @SetPermissions('account.get')
    @UseGuards(ApplicationJwtGuard, LocalAuthGuard)
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
        @Query('productId', ProductIndexationPipe) product: Product,
        @Query() { count }: AccountAddToCartRequest,
        @Response({ passthrough: true }) res
    ) {
        account.cart.push({
            id: product.id,
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
        @Query('productId', ProductIndexationPipe) product: Product,
        @Response({ passthrough: true }) res
    ) {
        if (!account.cart.some(p => p.id == product.id)) throw new HttpException('account.cart.element.notFound', 400);

        account.cart = account.cart.filter(e => e.id != product.id);
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
        @Query('productId', ProductIndexationPipe) product: Product,
        @Response({ passthrough: true }) res
    ) {
        account.pins.push(product.id);
        await this.accountService.save(account);

        await this.productService.countAction(product, account.id, 'pin');

        res.status(200);
    }

    @Post('pins/remove')
    @SetPermissions('account.update')
    @UseGuards(ApplicationJwtGuard)
    public async removeFromPins(
        @Query('id', ParseUUIDPipe, AccountIndexationPipe) account: Account,
        @Query('productId', ProductIndexationPipe) product: Product,
        @Response({ passthrough: true }) res
    ) {
        if (!account.pins.some(pid => pid == product.id)) throw new HttpException('account.pins.element.notFound', 400);

        account.pins = account.pins.filter(pid => pid != product.id);
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
