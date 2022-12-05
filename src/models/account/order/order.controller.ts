import { Controller, Get, Post, Query, UseGuards, Response, HttpException } from "@nestjs/common";
import { ModelGetRequest, ModelUpdateRequest } from "../../model.types";
import { ApplicationJwtGuard } from "../../../security/guards/jwt.guard";
import { SetPermissions, Permissions } from "../../../security/permissions/permissions";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";
import { OrderCreateDto } from "./validation/dto/create.dto";
import { OrderUpdateDto } from "./validation/dto/update.dto";
import { OrderIndexationPipe } from "./validation/pipes/indexation.pipe";


@Controller('order')
export class OrderController {
    static {
        Permissions.enlistPermissionsGroup('order', [ 'get', 'create', 'update', 'delete' ]);
    }

    constructor(
        private orderService: OrderService
    ) {}

    @Get()
    @SetPermissions('order.get')
    @UseGuards(ApplicationJwtGuard)
    public async get(
        @Query('id', OrderIndexationPipe) order,
        @Query() { fields }: ModelGetRequest
    ) {
        return fields ? order.pick(fields?.split(/\,/g)) : order;
    }

    @Post('create')
    @SetPermissions('order.create')
    @UseGuards(ApplicationJwtGuard)
    public async create(@Query() fields: OrderCreateDto) {
        return this.orderService.create(fields);
    }

    @Post('update')
    @SetPermissions('order.update')
    @UseGuards(ApplicationJwtGuard)
    public async update(
        @Query('id', OrderIndexationPipe) order,
        @Query() overrideFields: OrderUpdateDto,
        @Response({ passthrough: true }) res
    ) {
        let updated = await this.orderService.update(order, overrideFields);

        if (!updated) throw new HttpException('query.parameters.invalid', 500);

        return updated;
    }

    @Post('delete')
    @SetPermissions('order.delete')
    @UseGuards(ApplicationJwtGuard)
    public async delete(
        @Query('id', OrderIndexationPipe) order,
        @Response({ passthrough: true }) res
    ) {
        await this.orderService.remove(order);
        res.status(200);
    }
}