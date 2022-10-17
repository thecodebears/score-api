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

export class ApplicationIndexingDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}

export class GetApplicationDto extends ApplicationIndexingDto {
    @Allow()
    fields: string
}

export class AuthorizeApplicationDto extends ApplicationIndexingDto {};

export class UpdateApplicationDto extends ApplicationIndexingDto {
    @Allow()
    name: string;

    @Allow()
    description: string;

    @Allow()
    permissions: string[];
}