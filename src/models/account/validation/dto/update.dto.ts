import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsInt, IsJSON, IsOptional, IsString, ValidateNested } from "class-validator";
import { IntoNumberArray, IntoObjectArray } from "src/utils/dtoTranformers";
import { CartItem } from "../../account.types";
import { IntoNumber } from '../../../../utils/dtoTranformers';


export class AccountUpdateDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    avatarUrl: string = '';

    @IsOptional()
    @IsBoolean()
    employee: boolean = false;

    @IsOptional()
    @IsBoolean()
    admin: boolean = false;

    @IsOptional()
    @IsArray()
    @Transform(IntoObjectArray)
    @Type(() => CartItem)
    cart: CartItem[] = [];

    @IsOptional()
    @IsArray()
    @Transform(IntoNumberArray)
    @Type(() => Number)
    pins: number[] = [];

    @IsOptional()
    @IsArray()
    @Transform(IntoNumberArray)
    @Type(() => Number)
    orders: number[] = [];

    @IsOptional()
    @IsInt()
    @Transform(IntoNumber)
    foundPromocodesCount: number = 0;
}