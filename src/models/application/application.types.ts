import { IsString, IsNotEmpty, Allow } from 'class-validator';


export class CreateApplicationDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    permissions: string;
};

export class AuthorizeApplicationDto {
    @IsNotEmpty()
    @IsString()
    id: string;
};