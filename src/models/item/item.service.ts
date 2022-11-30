import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from './item.entity';
import { ModelService } from '../model.service';
import { ItemAnalyticsAction } from "./item.types";
import { DiscountService } from "./discount/discount.service";


@Injectable()
export class ItemService extends ModelService<Item> {
    constructor(
        @InjectRepository(Item) protected readonly repository: Repository<Item>,
        private discountService: DiscountService,
    ) {
        super();
    }

    public countAction(item: Item, accountId: string, type: ItemAnalyticsAction) {
        if (type === 'view') item.pushUnincluded<string>('views', accountId);
        if (type === 'pin') item.pushUnincluded<string>('pins', accountId);
        if (type === 'sale') item.pushUnincluded<string>('sales', accountId);
        this.save(item);
    }

    /**
     * Calculates price and discount.
     */
    public async calculate(item: Item) {
        let { discount, endTime } = (await this.discountService.findOneBy({ id: item.discountId })) || {};
        let price = item.costPrice * (1 + item.markup) * (1 - (discount || 0));

        Object.assign(item, {
            price,
            discount: discount || null,
            discountEndTime: endTime || null
        });

        this.save(item);

        return item;
    }
}