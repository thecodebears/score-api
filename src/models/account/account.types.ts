import { IsString, IsNotEmpty, Allow, IsBoolean } from 'class-validator';
import { Account } from "./account.entity";

type ProductId = string;
type Count = number;

export type Cart = {
    [key: ProductId]: Count
};

export class AccountIndexingDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}

export class GetAccountDto extends AccountIndexingDto {
    @Allow()
    fields: string
}

export class UpdateAccountDto extends AccountIndexingDto {
    @IsString()
    name?: string;

    @IsString()
    permissions?: string[];

    @IsString()
    public password?: string;

    @IsString()
    public avatarUrl?: string;

    @IsBoolean()
    public employee?: boolean;

    @IsBoolean()
    public admin?: boolean;
}

export interface RegistrationResponse {
    account: Account,
    token: string
}