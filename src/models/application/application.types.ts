import { IsString, IsNotEmpty, Allow } from 'class-validator';
import { Application } from './application.entity';


export type NewActionResponse = {
    application: Application,
    token: string
}