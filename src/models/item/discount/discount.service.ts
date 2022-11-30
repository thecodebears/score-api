import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ModelService } from 'src/models/model.service';
import { Repository } from "typeorm";
import { Discount } from './discount.entity';


@Injectable()
export class DiscountService extends ModelService<Discount> {
    constructor(
        @InjectRepository(Discount) protected readonly repository: Repository<Discount>,
    ) {
        super();
    }
}