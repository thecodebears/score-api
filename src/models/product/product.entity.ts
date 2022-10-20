import { Column, Entity } from 'typeorm';
import { ModelEntity } from '../model.entity';
import { ProductFeatures, ProductReview } from './product.types';


@Entity()
export abstract class Product extends ModelEntity {
    @Column('varchar', { length: 256 })
    public label: string;

    @Column('varchar', { length: 256 })
    public sublabel: string;

    @Column('varchar')
    public description: string;

    @Column('jsonb', { default: [] })
    public reviews: ProductReview[];

    @Column('varchar')
    public category: string;

    @Column('int')
    public price: number;

    @Column('int')
    public quantity: number;

    @Column('int', { default: 0 })
    public sold: number;

    @Column('boolean')
    public delivered: boolean;

    @Column('jsonb')
    public features: ProductFeatures;
}
