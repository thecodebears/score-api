import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { IntoStringArray } from "src/utils/dtoTranformers";


export class ApplicationCreateDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsArray()
    @Transform(IntoStringArray(',', true))
    permissions: string[];
}
