import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
import { IntoStringArray } from "src/utils/dtoTranformers";


export class ItemSearchDto {
    @IsOptional()
    @IsString()
    query: string;
    
    @IsOptional()
    @IsString()
    category: string;

    @IsOptional()
    @IsArray()
    @Transform(IntoStringArray(','))
    tags: string[]
}