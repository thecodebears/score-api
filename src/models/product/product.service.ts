import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from './product.entity';
import { ModelService } from '../model.service';
import { Review } from "./review/review.entity";
import { Columns } from "../model.types";
import { AccountService } from "../account/account.service";


@Injectable()
export class ProductService extends ModelService<Product> {
    constructor(
        @InjectRepository(Product) protected readonly repository: Repository<Product>,
        @InjectRepository(Review) protected readonly reviewRepository: Repository<Review>,
        private accountService: AccountService
    ) {
        super();
    }
}