import { HttpException, Injectable, PipeTransform } from "@nestjs/common";
import { DiscountService } from "../../discount.service";


@Injectable()
export class DiscountIndexationPipe implements PipeTransform {
    constructor(
        private discountService: DiscountService
    ) {}

    public async transform(value: any) {
        let item = value ? await this.discountService.findOneBy({ id: value as string }) : null;
        if (!item) throw new HttpException('discount.entity.notFound', 400);
        return item;
    }
}
