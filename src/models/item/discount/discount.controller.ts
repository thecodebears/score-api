import { Controller, Get, Post, Query, UseGuards, Response, HttpException } from "@nestjs/common";
import { ModelGetRequest } from "src/models/model.types";
import { ApplicationJwtGuard } from "src/security/guards/jwt.guard";
import { SetPermissions, Permissions } from "src/security/permissions/permissions";
import { DiscountService } from "./discount.service";
import { DiscountCreateDto } from "./validation/dto/create.dto";
import { DiscountUpdateDto } from "./validation/dto/update.dto";
import { DiscountIndexationPipe } from "./validation/pipes/indexation.pipe";


@Controller('discount')
export class DiscountController {
    static {
        Permissions.enlistPermissionsGroup('discount', [ 'get', 'create', 'update', 'delete' ]);
    }

    constructor(
        private discountService: DiscountService
    ) {}

    @Get()
    @SetPermissions('discount.get')
    @UseGuards(ApplicationJwtGuard)
    public async get(
        @Query('id', DiscountIndexationPipe) discount,
        @Query() { fields }: ModelGetRequest
    ) {
        return fields ? discount.pick(fields?.split(/\,/g)) : discount;
    }

    @Post('create')
    @SetPermissions('discount.create')
    @UseGuards(ApplicationJwtGuard)
    public async create(@Query() fields: DiscountCreateDto) {
        return this.discountService.create(fields);
    }

    @Post('update')
    @SetPermissions('discount.update')
    @UseGuards(ApplicationJwtGuard)
    public async update(
        @Query('id', DiscountIndexationPipe) discount,
        @Query() overrideFields: DiscountUpdateDto
    ) {
        let updated = await this.discountService.update(discount, overrideFields);

        if (!updated) throw new HttpException('query.parameters.invalid', 500);

        return updated;
    }

    @Post('delete')
    @SetPermissions('discount.delete')
    @UseGuards(ApplicationJwtGuard)
    public async delete(
        @Query('id', DiscountIndexationPipe) item,
        @Response({ passthrough: true }) res
    ) {
        await this.discountService.remove(item);
        res.status(200);
    }
}