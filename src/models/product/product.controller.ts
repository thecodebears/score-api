import { Controller, Get, HttpException, Post, Query, UseGuards, Response } from "@nestjs/common";
import { ApplicationJwtGuard } from "../../guard/jwt.guard";
import { ModelCreateRequest, ModelDeleteRequest, ModelGetRequest, ModelSearchRequest, ModelUpdateRequest } from "../model.types";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";
import { Permissions } from "../../decorators/permissions.decorator";
import { ProductCreateRequest } from "./product.types";


@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService
    ) {}

    @Get()
    @Permissions('product.get')
    @UseGuards(ApplicationJwtGuard)
    public async get(@Query() { id, fields }: ModelGetRequest) {
        const product = await this.productService.findOneBy({ id });
        if (!product) throw new HttpException('Product not found.', 404);
        return fields ? product.pick(fields?.split(/\,/g)) : product;
    }

    @Post('create')
    @Permissions('product.create')
    @UseGuards(ApplicationJwtGuard)
    public async create(@Query() fields: ProductCreateRequest) {
        return this.productService.create(fields);
    }

    @Post('search')
    @Permissions('product.search')
    @UseGuards(ApplicationJwtGuard)
    public async search() {
        // Waiting for search engine.
        return 'Not implemented.';
    }

    @Post('update')
    @Permissions('product.update')
    @UseGuards(ApplicationJwtGuard)
    public async update(
        @Query() { id, ...overrideFields }: ModelUpdateRequest<Product>,
        @Response({ passthrough: true }) res
    ) {
        let product = await this.productService.findOneBy({ id });
        if (!product) throw new HttpException('product not found.', 404);

        let updateResult = await this.productService.update(product, overrideFields);
        if (!updateResult) throw new HttpException('Failed to update product. Check your parameters, it may be incorrect.', 500);

        res.status(200);
    }

    @Post('delete')
    @Permissions('product.delete')
    @UseGuards(ApplicationJwtGuard)
    public async delete(
        @Query() { id }: ModelDeleteRequest,
        @Response({ passthrough: true }) res
    ) {
        let product = await this.productService.findOneBy({ id });
        if (!product) throw new HttpException('Product not found.', 404);

        await this.productService.remove(product);

        res.status(200);
    }
}