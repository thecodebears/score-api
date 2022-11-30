import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export type OrderReceiveMethod = 'pickup' | 'delivery';

export type OrderStatus = 'packaging' | 'carrying' | 'arrived' | 'ready' | 'closed'; 

export class OrderCustomerInfo {
    @IsNotEmpty()
    @IsString()
    fullName: string;
    
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsOptional()
    @IsString()
    email = '';
}

export type OrderDeliveryType = 'cdekCourier' | 'cdekPoint' | 'postOffice';

export class OrderDeliveryRegion {
    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    postcode: string;
}

export type OrderDeliveryAddress = string;