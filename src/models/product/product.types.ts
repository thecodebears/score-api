import { Transform } from "class-transformer";
import {IsBoolean, IsJSON, IsNotEmpty, IsNumber, IsString } from "class-validator";

type ProductFeatureLabel = string;

type ProductFeatureValue = string;

export type ProductFeatures = {
    [key: ProductFeatureLabel]: ProductFeatureValue
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
