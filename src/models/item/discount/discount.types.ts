import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class DiscountCreateRequest {
    @IsNotEmpty()
    @IsString()
    label: string;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    discount: number;

    @IsInt()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    endTime?: number;
}