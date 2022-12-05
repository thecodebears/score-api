import { Transform, Type } from "class-transformer";
import { IsArray, IsInt, IsObject, IsOptional, IsString } from "class-validator";
import { IntoJSON, IntoNumber, IntoNumberArray } from "../../../../../utils/dtoTranformers";
import { OrderCustomerInfo, OrderDeliveryAddress, OrderDeliveryRegion, OrderDeliveryType, OrderReceiveMethod, OrderStatus } from "../../order.types";


export class OrderUpdateDto {
    @IsOptional()
    @IsInt()
    @Transform(IntoNumber)
    public cost: number;

    @IsOptional()
    @IsArray()
    @Transform(IntoNumberArray(',', true))
    public items: number[];

    @IsOptional()
    @IsInt()
    @Transform(IntoNumber)
    public startTime: number;

    @IsOptional()
    @IsString()
    public receiveMethod: OrderReceiveMethod;

    @IsOptional()
    @IsString()
    public status: OrderStatus;

    @IsOptional()
    @IsObject()
    @Transform(IntoJSON)
    @Type(() => OrderCustomerInfo)
    public customerInfo: OrderCustomerInfo;

    @IsOptional()
    @IsString()
    public deliveryType: OrderDeliveryType;

    @IsOptional()
    @IsObject()
    @Transform(IntoJSON)
    @Type(() => OrderDeliveryRegion)
    public deliveryRegion: OrderDeliveryRegion;

    @IsOptional()
    @IsString()
    public deliveryAddress: OrderDeliveryAddress;
}
