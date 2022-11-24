import { Column, Entity, Index } from 'typeorm';
import { ModelEntity } from '../model.entity';
import { CartItem } from './account.types';


@Entity()
export abstract class Account extends ModelEntity {
    @Column('varchar', { length: 256 })
    public name: string;

    @Column('varchar')
    public password: string;

    @Column('varchar', { default: '' })
    public avatarUrl: string = '';

    @Column('boolean', { default: false })
    public employee: boolean = false;

    @Column('boolean', { default: false })
    public admin: boolean = false;

    @Column('jsonb', { default: [] })
    public cart: CartItem[] = [];

    @Column('varchar', { default: [], array: true })
    public pins: number[] = [];

    @Column('varchar', { default: [], array: true })
    public orders: number[] = [];

    @Column('int', { default: 0 })
    public foundPromocodesCount: number = 0;
}
