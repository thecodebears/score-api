import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { ItemController } from './item.controller';
import { Discount } from './discount/discount.entity';
import { DiscountService } from './discount/discount.service';
import { DiscountController } from './discount/discount.controller';


@Module({
    imports: [
        TypeOrmModule.forFeature([ Item, Discount ])
    ],
    providers: [
        ItemService,
        DiscountService
    ],
    controllers: [
        ItemController,
        DiscountController
    ],
    exports: [ ItemService ]
})
export class ItemModule {}