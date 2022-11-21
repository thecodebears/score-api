import { Column, Entity } from 'typeorm';
import { ModelEntity } from '../model.entity';
import { ProductFeatures } from './product.types';


@Entity()
export abstract class Product extends ModelEntity {
    @Column('varchar', { length: 4, default: 'A000' })
    public code: string;

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

    @Column('varchar', { array: true, nullable: true })
    public photos: string[];

    // analytics

    @Column('int', { default: 0 })
    public sales: number;

    @Column('int', { default: 0 })
    public pins: number;

    @Column('int', { default: 0 })
    public views: number;
}
