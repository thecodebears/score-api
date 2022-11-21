import { Transform } from "class-transformer";
import { IsBoolean, IsJSON, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ModelIndexationRequest } from "../model.types";


export type ProductFeatures = {
    [key: string]: string
};

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
    features: ProductFeatures;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.split(/\,/g).filter(e => e))
    tags: string[];

    @IsNotEmpty()
    @IsString()
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
