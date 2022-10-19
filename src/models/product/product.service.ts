import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from './product.entity';
import { ModelService } from '../model.service';


@Injectable()
export class ProductService extends ModelService<Product> {
    constructor(@InjectRepository(Product) protected readonly repository: Repository<Product>) {
        super();
    }
}