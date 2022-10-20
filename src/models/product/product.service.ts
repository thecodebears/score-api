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

    public async addReview(product: Product, { author, rating, details }: Columns<Review>): Promise<Review> {
        if (product.reviews.some(r => r.author === author))
            throw new HttpException('This account already has already reviewed this product.', 400);
        if (rating > 10 || rating < 1)
            throw new HttpException('Exceeded rating number range. (0 -> 10)', 400);
        if (!(await this.accountService.findOneBy({ id: author })))
            throw new HttpException('Author not found.', 404);

        let review = await this.reviewRepository.create({ author, rating, details });
        let existingReviews = product.reviews;

        existingReviews.push({
            review: review.id,
            author: author
        });

        await this.update(product, { reviews: existingReviews });

        return review;
    }
}