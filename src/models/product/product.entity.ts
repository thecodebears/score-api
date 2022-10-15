import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';


@Entity()
export abstract class Product extends BaseEntity {
    @Column('varchar', { length: 256 })
    public label: string;

    @Column('varchar', { length: 256 })
    public sublabel: string;

    @Column('varchar')
    public description: string;

    @Column('float')
    public rating: number;

    @Column('varchar')
    public category: string;

    @Column('int')
    public price: number;

    @Column('int')
    public quantity: number;

    @Column('int')
    public sold: number;

    @Column('varchar')
    public status: string;

    @Column('date')
    public firstDelivery: Date;

    @Column('json')
    public features: string;
}
