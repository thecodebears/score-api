import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from './product.entity';
import { EntityService } from '../base.service';


@Injectable()
export class ProductService extends EntityService<Product> {
    constructor(@InjectRepository(Product) protected readonly repository: Repository<Product>) {
        super();
    }
}