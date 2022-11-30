import { Transform, Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsObject, IsString } from "class-validator";
import { IntoJSON, IntoNumber, IntoNumberArray } from "src/utils/dtoTranformers";
import { OrderCustomerInfo, OrderDeliveryAddress, OrderDeliveryRegion, OrderDeliveryType, OrderReceiveMethod, OrderStatus } from "../../order.types";


export class OrderCreateDto {
    @IsNotEmpty()
    @IsInt()
    @Transform(IntoNumber)
    public cost: number;

    @IsNotEmpty()
    @IsArray()
    @Transform(IntoNumberArray(',', true))
    public items: number[];

    @IsNotEmpty()
    @IsInt()
    @Transform(IntoNumber)
    public startTime: number;

    @IsNotEmpty()
    @IsString()
    public receiveMethod: OrderReceiveMethod;

    @IsNotEmpty()
    @IsString()
    public status: OrderStatus;

    @IsNotEmpty()
    @IsObject()
    @Transform(IntoJSON)
    @Type(() => OrderCustomerInfo)
    public customerInfo: OrderCustomerInfo;

    @IsNotEmpty()
    @IsString()
    public deliveryType: OrderDeliveryType;

    @IsNotEmpty()
    @IsObject()
    @Transform(IntoJSON)
    @Type(() => OrderDeliveryRegion)
    public deliveryRegion: OrderDeliveryRegion;

    @IsNotEmpty()
    @IsString()
    public deliveryAddress: OrderDeliveryAddress;
}
