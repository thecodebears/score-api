import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, IsInt } from "class-validator";
import { Account } from "./account.entity";


export class CartItem {
    id: number;
    count: number;
}

export type SignUpResponse = {
    account: Account,
    token: string
};
