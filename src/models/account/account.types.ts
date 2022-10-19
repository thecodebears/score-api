import { IsString, IsNotEmpty } from "class-validator";
import { Account } from "./account.entity";

type ProductId = string;
type Count = number;

export type Cart = {
    [key: ProductId]: Count
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
