import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsInt, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ModelIndexationRequest } from "../model.types";


export type ItemFeatures = {
    [key: string]: string
};

export type ItemAnalyticsAction = 'view' | 'pin' | 'sale';
