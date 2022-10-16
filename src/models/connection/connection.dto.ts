import { IsString, IsNotEmpty, Allow } from 'class-validator';
import { ConnectionType } from './connection.types';


export class DiscordConnectDto {
    @IsNotEmpty()
    @IsString()
    code: string;

    @Allow()
    accountId: string;
}