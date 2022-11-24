import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NumberSerializedModelEntity } from '../model.entity';
import { ProductFeatures } from './product.types';


@Entity()
export abstract class Product extends NumberSerializedModelEntity {
    @Column('varchar', { length: 256 })
    public label: string;

    @Column('varchar')
    public description: string;

    @Column('varchar')
    public category: string;

    @Column('int')
    public costPrice: number;

    @Column('float')
    public markup: number;

    @Column('int')
    public quantity: number;

    @Column('jsonb')
    public features: ProductFeatures;

    @Column('varchar', { array: true })
    public tags: string[];

    @Column('varchar', { array: true })
    public photos: string[];

    /**
     * Rows below are used for analytics.
     * It contains user id's.
     */

    @Column('varchar', { array: true })
    public sales: string[] = [];

    @Column('varchar', { array: true })
    public pins: string[] = [];

    @Column('varchar', { array: true })
    public views: string[] = [];
}
