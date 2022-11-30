import { Transform } from "class-transformer";
import { IsArray, IsInt, IsJSON, IsNumber, IsOptional, IsString } from "class-validator";
import { IntoNumber, IntoStringArray } from "src/utils/dtoTranformers";
import { ItemFeatures } from "../../item.types";


export class ItemUpdateDto{
    @IsOptional()
    @IsString()
    label: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    category: string;

    @IsOptional()
    @IsInt()
    @Transform(IntoNumber)
    quantity: number;

    @IsOptional()
    @IsJSON()
    @Transform(IntoNumber)
    features: ItemFeatures;

    @IsOptional()
    @IsArray()
    @Transform(IntoStringArray(',', true))
    tags: string[];

    @IsOptional()
    @IsArray()
    @Transform(IntoStringArray(';', true))
    photos: string[];

    @IsOptional()
    @IsInt()
    @Transform(IntoNumber)
    costPrice: number;

    @IsOptional()
    @IsNumber()
    @Transform(IntoNumber)
    markup: number;

    @IsOptional()
    @IsString()
    discountId: string;

    @IsOptional()
    @IsInt()
    @Transform(IntoNumber)
    price: number;

    @IsOptional()
    @IsNumber()
    @Transform(IntoNumber)
    discount: number;

    @IsOptional()
    @IsInt()
    @Transform(IntoNumber)
    discountEndTime: number;

    @IsOptional()
    @IsArray()
    @Transform(IntoStringArray(',', true))
    sales: string[] = [];

    @IsOptional()
    @IsArray()
    @Transform(IntoStringArray(',', true))
    pins: string[] = [];

    @IsOptional()
    @IsArray()
    @Transform(IntoStringArray(',', true))
    views: string[] = [];
}