import { IsNotEmpty, IsString } from "class-validator";


export class AccountCreateDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
