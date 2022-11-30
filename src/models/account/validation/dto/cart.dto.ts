import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { IntoNumber } from "src/utils/dtoTranformers";


export class AccountAddToCartDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(IntoNumber)
    count: number;
}
