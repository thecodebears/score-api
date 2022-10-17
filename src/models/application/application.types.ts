import { IsString, IsNotEmpty, Allow } from 'class-validator';


export class GetApplicationDataDto {
    fields: string[]
}

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

export class UpdateApplicationDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsString()
    name?: string;

    @IsString()
    description?: string;

    @IsString()
    permissions?: string[];
}