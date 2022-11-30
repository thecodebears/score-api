import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NumberSerializedModelEntity } from '../model.entity';
import { ItemFeatures } from './item.types';


@Entity()
export abstract class Item extends NumberSerializedModelEntity {
    @Column('varchar', { length: 256 })
    public label: string;

    @Column('varchar')
    public description: string;

    @Column('varchar')
    public category: string;

    @Column('int')
    public quantity: number;

    @Column('jsonb')
    public features: ItemFeatures;

    @Column('varchar', { array: true })
    public tags: string[];

    @Column('varchar', { array: true })
    public photos: string[];

    /**
     * Rows below are used for price
     * calculation and statistics.
     * 
     * price = costPrice * (1 + markup) * (1 - discount)
     */

    @Column('int')
    public costPrice: number;

    @Column('float')
    public markup: number = 0;

    @Column('varchar', { nullable: true })
    public discountId: string;

    /**
     * Rows below are calculated.
     */

    @Column('int', { nullable: true })
    public price: number;

    @Column('float', { nullable: true })
    public discount: number;

    @Column('int', { nullable: true })
    public discountEndTime: number;

    /**
     * Rows below are used for analytics.
     * 
     * It contains user ids.
     */

    @Column('varchar', { array: true })
    public sales: string[] = [];

    @Column('varchar', { array: true })
    public pins: string[] = [];

    @Column('varchar', { array: true })
    public views: string[] = [];
}
