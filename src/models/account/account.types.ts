import { IsString, IsNotEmpty } from "class-validator";
import { Account } from "./account.entity";


export type CartItem = {
    id: string,
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
