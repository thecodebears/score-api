import { IsNotEmpty, IsString } from 'class-validator';

export type AccountSessionDetails = {
    id: string;
};

export type Done<T> = (err: Error, user: T) => void;

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
};

export class CodeAuthorizationDto {
    @IsNotEmpty()
    @IsString()
    code: string;
};