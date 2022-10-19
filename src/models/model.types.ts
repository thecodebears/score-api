import { IsString, IsNotEmpty, Allow } from 'class-validator';
import { DeepPartial } from 'typeorm';


export type Columns<T> = DeepPartial<T>;

export class ModelIndexationRequest {
    @IsNotEmpty()
    @IsString()
    id: string;
}

/*
 * Split fields by , to form an array of fields.
 */
export class ModelGetRequest extends ModelIndexationRequest {
    @Allow()
    @IsString()
    fields: string;
}

export class ModelDeleteRequest extends ModelIndexationRequest {}

export type ModelUpdateRequest<T> = ModelIndexationRequest & Columns<T>;

export type ModelSearchRequest<T> = Columns<T>;

export type ModelCreateRequest<T> = Columns<T>;
