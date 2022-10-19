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
    @IsNotNull()
    username: string;

    @IsString()
    @IsNotNull()
    password: string;
}