import { Controller, Get, HttpException, Post, Query, UseGuards, Response, ParseUUIDPipe } from "@nestjs/common";
import { SetPermissions, Permissions } from "src/security/permissions/permissions";
import { ApplicationJwtGuard } from "../../security/guards/jwt.guard";
import { AccountIndexationPipe } from "../account/validation/pipes/indexation.pipe";
import { ModelGetRequest } from "../model.types";
import { ItemService } from "./item.service";
import { ItemCountActionDto } from "./validation/dto/countAction.dto";
import { ItemCreateDto } from "./validation/dto/create.dto";
import { ItemSearchDto } from "./validation/dto/search.dto";
import { ItemUpdateDto } from "./validation/dto/update.dto";
import { ItemIndexationPipe } from "./validation/pipes/indexation.pipe";


@Controller('item')
export class ItemController {
    static {
        Permissions.enlistPermissionsGroup('item', [ 'get', 'create', 'update', 'delete' ]);
    }

    constructor(
        private itemService: ItemService
    ) {}

    @Get()
    @SetPermissions('item.get')
    @UseGuards(ApplicationJwtGuard)
    public async get(
        @Query('id', ItemIndexationPipe) item,
        @Query() { fields }: ModelGetRequest
    ) {
        return fields ? item.pick(fields?.split(/\,/g)) : item;
    }

    @Post('create')
    @SetPermissions('item.create')
    @UseGuards(ApplicationJwtGuard)
    public async create(@Query() fields: ItemCreateDto) {
        return this.itemService.create(fields);
    }

    @Post('search')
    @SetPermissions('item.get')
    @UseGuards(ApplicationJwtGuard)
    public async search(@Query() { query, category, tags }: ItemSearchDto) {
        let list = await (category ? this.itemService.findBy({ category }) : this.itemService.all());

        return Promise.all(
            list.filter(p => {
                let findMatchesIn = p.label.toLowerCase() + p.description.toLowerCase();
                return tags.every(t => p.tags.includes(t)) || findMatchesIn.indexOf(query?.toLowerCase()) >= 0
            }).map(this.itemService.calculate)
        );
    }

    @Post('update')
    @SetPermissions('item.update')
    @UseGuards(ApplicationJwtGuard)
    public async update(
        @Query('id', ItemIndexationPipe) item,
        @Query() overrideFields: ItemUpdateDto
    ) {
        let updated = await this.itemService.update(item, overrideFields);

        if (!updated) throw new HttpException('query.parameters.invalid', 500);

        return updated;
    }

    @Post('delete')
    @SetPermissions('item.delete')
    @UseGuards(ApplicationJwtGuard)
    public async delete(
        @Query('id', ItemIndexationPipe) item,
        @Response({ passthrough: true }) res
    ) {
        await this.itemService.remove(item);

        res.status(200);
    }

    @Post('countAction')
    @SetPermissions('item.update')
    @UseGuards(ApplicationJwtGuard)
    public async countAction(
        @Query('id', ItemIndexationPipe) item,
        @Query('accountId', AccountIndexationPipe) account,
        @Query() { type }: ItemCountActionDto,
        @Response({ passthrough: true }) res
    ) {
        await this.itemService.countAction(item, account.id, type);

        res.status(200);
    }
}