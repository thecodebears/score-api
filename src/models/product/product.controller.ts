import { Controller, Get, HttpException, Post, Query, UseGuards, Response } from "@nestjs/common";
import { SetPermissions, Permissions } from "src/utils/permissions";
import { ApplicationJwtGuard } from "../../guards/jwt.guard";
import { ModelCreateRequest, ModelDeleteRequest, ModelGetRequest, ModelSearchRequest, ModelUpdateRequest } from "../model.types";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";
import { ProductAddReviewRequest, ProductCreateRequest } from "./product.types";


@Controller('product')
export class ProductController {
    static {
        Permissions.enlistPermissionsGroup('product', [ 'get', 'create', 'update', 'delete' ]);
    }

    constructor(
        private productService: ProductService
    ) {}

    @Get()
    @SetPermissions('product.get')
    @UseGuards(ApplicationJwtGuard)
    public async get(@Query() { id, fields }: ModelGetRequest) {
        const product = await this.productService.findOneBy({ id });
        if (!product) throw new HttpException('Product not found.', 404);
        return fields ? product.pick(fields?.split(/\,/g)) : product;
    }

    @Post('create')
    @SetPermissions('product.create')
    @UseGuards(ApplicationJwtGuard)
    public async create(@Query() fields: ProductCreateRequest) {
        return this.productService.create(fields);
    }

    @Post('search')
    @SetPermissions('product.get')
    @UseGuards(ApplicationJwtGuard)
    public async search() {
        // Waiting for search engine.
        return 'Not implemented.';
    }

    @Post('update')
    @SetPermissions('product.update')
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
    @SetPermissions('product.delete')
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

    @Post('addReview')
    @SetPermissions('product.update')
    @UseGuards(ApplicationJwtGuard)
    public async addReview(@Query() { id, author, rating, details }: ProductAddReviewRequest) {
        let product = await this.productService.findOneBy({ id });
        if (!product) throw new HttpException('Product not found.', 404);

        return this.productService.addReview(product, { author, rating, details });
    }
}