import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
import { IntoStringArray } from "src/utils/dtoTranformers";


export class ApplicationUpdateDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsArray()
    @Transform(IntoStringArray(',', true))
    permissions: string[];
}
