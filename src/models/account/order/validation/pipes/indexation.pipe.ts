import { HttpException, Injectable, PipeTransform } from "@nestjs/common";
import { OrderService } from "../../order.service";


@Injectable()
export class OrderIndexationPipe implements PipeTransform {
    constructor(
        private orderService: OrderService
    ) {}

    public async transform(value: any) {
        let item = value ? await this.orderService.findOneBy({ id: value as number }) : null;
        if (!item) throw new HttpException('discount.entity.notFound', 400);
        return item;
    }
}
