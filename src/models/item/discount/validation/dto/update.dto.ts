import { Transform } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { IntoNumber } from "src/utils/dtoTranformers";


export class DiscountUpdateDto {
    @IsOptional()
    @IsString()
    public label: string;

    @IsOptional()
    @IsNumber()
    @Transform(IntoNumber)
    public discount: number;

    @IsOptional()
    @IsInt()
    @Transform(IntoNumber)
    public endTime: number;
}