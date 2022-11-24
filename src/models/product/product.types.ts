import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsJSON, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ModelIndexationRequest } from "../model.types";


export type ProductFeatures = {
    [key: string]: string
};

export type ProductAnalyticsAction = 'view' | 'pin' | 'sale';

export class ProductCreateRequest {
    @IsNotEmpty()
    @IsString()
    label: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    costPrice: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    markup: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    quantity: number;

    @IsNotEmpty()
    @IsJSON()
    @Transform(({ value }) => JSON.parse(value))
    features: ProductFeatures;

    @IsNotEmpty()
    @IsArray()
    @Transform(({ value }) => value.split(/\,/g).filter(e => e))
    tags: string[];

    @IsNotEmpty()
    @IsArray()
    @Transform(({ value }) => value.split(/\;/g).filter(e => e))
    photos: string[];
}

export class ProductSearchRequest {
    @IsString()
    query: string;
    
    @IsString()
    category: string;

    @IsString()
    @Transform(({ value }) => value.split(/\;/g).filter(e => e))
    tags: string[]
}

export class ProductCountActionRequest {
    @IsNotEmpty()
    @IsString()
    type: ProductAnalyticsAction;
}
