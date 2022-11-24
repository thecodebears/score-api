import { HttpException, Injectable, PipeTransform } from "@nestjs/common";
import { ProductService } from "../../product.service";


@Injectable()
export class ProductIndexationPipe implements PipeTransform {
    constructor(
        private productService: ProductService
    ) {}

    public async transform(value: any) {
        let product = value ? await this.productService.findOneBy({ id: value as number }) : null;
        if (!product) throw new HttpException('product.entity.notFound', 400);
        return product;
    }
}
