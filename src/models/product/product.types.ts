import { Transform } from "class-transformer";
import {IsBoolean, IsJSON, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ModelIndexationRequest } from "../model.types";


export type ProductFeatures = {
    [key: string]: string
};

export type ProductReview = {
    review: string,
    author: string
};

export class ProductCreateRequest {
    @IsNotEmpty()
    @IsString()
    label: string;

    @IsNotEmpty()
    @IsString()
    sublabel: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    price: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    quantity: number;

    @IsNotEmpty()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    delivered: boolean;

    @IsNotEmpty()
    @IsJSON()
    features: ProductFeatures;
}

export class ProductAddReviewRequest extends ModelIndexationRequest {
    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    rating: number;

    @IsNotEmpty()
    @IsString()
    details: string;
}
