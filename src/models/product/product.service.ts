import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from './product.entity';
import { ModelService } from '../model.service';
import { Columns } from "../model.types";
import { AccountService } from "../account/account.service";
import { ProductAnalyticsAction } from "./product.types";


@Injectable()
export class ProductService extends ModelService<Product> {
    constructor(
        @InjectRepository(Product) protected readonly repository: Repository<Product>
    ) {
        super();
    }

    public countAction(product: Product, accountId: string, type: ProductAnalyticsAction) {
        if (type === 'view') product.pushUnincluded<string>('views', accountId);
        if (type === 'pin') product.pushUnincluded<string>('pins', accountId);
        if (type === 'sale') product.pushUnincluded<string>('sales', accountId);
        this.save(product);
    }
}