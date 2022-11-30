import { HttpException, Injectable, PipeTransform } from "@nestjs/common";
import { ItemService } from "../../item.service";


@Injectable()
export class ItemIndexationPipe implements PipeTransform {
    constructor(
        private itemService: ItemService
    ) {}

    public async transform(value: any) {
        let item = value ? await this.itemService.findOneBy({ id: value as number }) : null;

        if (!item) throw new HttpException('item.entity.notFound', 400);

        return this.itemService.calculate(item);
    }
}
