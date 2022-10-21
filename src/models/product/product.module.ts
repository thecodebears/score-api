import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductController } from './product.controller';
import { Review } from './review/review.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ Product, Review ])
    ],
    providers: [ ProductService ],
    controllers: [ ProductController ],
    exports: [ ProductService ]
})
export class ProductModule {}