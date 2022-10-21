import { Controller, Get, HttpException, Post, Query, UseGuards, Response, ParseUUIDPipe } from "@nestjs/common";
import { SetPermissions, Permissions } from "src/security/permissions/permissions";
import { ApplicationJwtGuard } from "../../security/guards/jwt.guard";
import { ModelCreateRequest, ModelDeleteRequest, ModelGetRequest, ModelSearchRequest, ModelUpdateRequest } from "../model.types";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";
import { ProductAddReviewRequest, ProductCreateRequest } from "./product.types";
import { ProductIndexationPipe } from "./validation/pipes/indexation.pipe";


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
    public async get(
        @Query('id', ParseUUIDPipe, ProductIndexationPipe) product,
        @Query() { fields }: ModelGetRequest
    ) {
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
        @Query('id', ParseUUIDPipe, ProductIndexationPipe) product,
        @Query() overrideFields: ModelUpdateRequest<Product>,
        @Response({ passthrough: true }) res
    ) {
        let updateResult = await this.productService.update(product, overrideFields);
        if (!updateResult) throw new HttpException('Failed to update product. Check your parameters, it may be incorrect.', 500);

        res.status(200);
    }

    @Post('delete')
    @SetPermissions('product.delete')
    @UseGuards(ApplicationJwtGuard)
    public async delete(
        @Query('id', ParseUUIDPipe, ProductIndexationPipe) product,
        @Response({ passthrough: true }) res
    ) {
        await this.productService.remove(product);
        res.status(200);
    }

    @Post('addReview')
    @SetPermissions('product.update')
    @UseGuards(ApplicationJwtGuard)
    public async addReview(
        @Query('id', ParseUUIDPipe, ProductIndexationPipe) product,
        @Query() { author, rating, details }: ProductAddReviewRequest
    ) {
        return this.productService.addReview(product, { author, rating, details });
    }
}