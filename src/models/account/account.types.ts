import { IsString, IsNotEmpty, Allow, IsBoolean } from 'class-validator';

type ProductId = string;
type Count = number;

export type Cart = {
    [key: ProductId]: Count
};

export class GetAccountDataDto {
    fields: string[]
}

export class UpdateAccountDto {
    @IsNotEmpty()
    @IsString()
    id: string;

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