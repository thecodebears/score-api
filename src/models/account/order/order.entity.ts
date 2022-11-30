import { Column, Entity } from 'typeorm';
import { NumberSerializedModelEntity } from '../../model.entity';
import { OrderCustomerInfo, OrderDeliveryAddress, OrderDeliveryRegion, OrderDeliveryType, OrderReceiveMethod, OrderStatus } from './order.types';


@Entity()
export abstract class Order extends NumberSerializedModelEntity {
    @Column('int')
    public cost: number;

    @Column('int', { array: true })
    public items: number[];

    @Column('int')
    public startTime: number;

    @Column('varchar')
    public receiveMethod: OrderReceiveMethod;

    @Column('varchar')
    public status: OrderStatus;

    @Column('jsonb')
    public customerInfo: OrderCustomerInfo;

    @Column('varchar', { nullable: true })
    public deliveryType: OrderDeliveryType;

    @Column('jsonb', { nullable: true })
    public deliveryRegion: OrderDeliveryRegion;

    @Column('jsonb', { nullable: true })
    public deliveryAddress: OrderDeliveryAddress;
}
