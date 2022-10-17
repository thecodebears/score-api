import { Account } from "./account.entity";

type ProductId = string;
type Count = number;

export type Cart = {
    [key: ProductId]: Count
};

export interface RegistrationResponse {
    account: Account,
    token: string
}