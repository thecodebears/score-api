import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, IsInt } from "class-validator";
import { Account } from "./account.entity";


export type CartItem = {
    id: number,
    count: number
};

export type SignUpResponse = {
    account: Account,
    token: string
};

export class AccountSignUpRequest {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class AccountAddToCartRequest {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    count: number;
}
