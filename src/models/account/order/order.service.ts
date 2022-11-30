import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ModelService } from 'src/models/model.service';
import { Repository } from "typeorm";
import { Order } from './order.entity';


@Injectable()
export class OrderService extends ModelService<Order> {
    constructor(
        @InjectRepository(Order) protected readonly repository: Repository<Order>,
    ) {
        super();
    }
}