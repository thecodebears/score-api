import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IntoNumber } from "src/utils/dtoTranformers";


export class DiscountCreateDto {
    @IsNotEmpty()
    @IsString()
    label: string;

    @IsNotEmpty()
    @IsNumber()
    @Transform(IntoNumber)
    discount: number;

    @IsInt()
    @IsOptional()
    @Transform(IntoNumber)
    endTime?: number;
}
