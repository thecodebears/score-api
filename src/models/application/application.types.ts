import { IsString, IsNotEmpty, Allow } from 'class-validator';
import { Application } from './application.entity';


export class ApplicationNewRequest {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    permissions: string;
}

export type NewActionResponse = {
    application: Application,
    token: string
}