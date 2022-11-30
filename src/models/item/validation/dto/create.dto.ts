import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { IntoJSON, IntoNumber, IntoStringArray } from "src/utils/dtoTranformers";
import { ItemFeatures } from '../../item.types';


export class ItemCreateDto {
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
    @Transform(IntoNumber)
    costPrice: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(IntoNumber)
    markup: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(IntoNumber)
    quantity: number;

    @IsNotEmpty()
    @IsObject()
    @Transform(IntoJSON)
    features: ItemFeatures;

    @IsNotEmpty()
    @IsArray()
    @Transform(IntoStringArray(',', true))
    tags: string[];

    @IsNotEmpty()
    @IsArray()
    @Transform(IntoStringArray(';', true))
    photos: string[];
}