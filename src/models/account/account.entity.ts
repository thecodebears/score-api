import { Column, Entity, Index } from 'typeorm';
import { ModelEntity } from '../model.entity';
import { Cart } from './account.types';


@Entity()
export abstract class Account extends ModelEntity {
    @Column('varchar', { length: 256 })
    @Index({ unique: true })
    public name: string;

    @Column('varchar')
    public password: string;

    @Column('varchar', { default: '' })
    public avatarUrl: string = '';

    @Column('boolean', { default: false })
    public employee: boolean = false;

    @Column('boolean', { default: false })
    public admin: boolean = false;

    @Column('jsonb', { default: {} })
    public cart: Cart = {};

    @Column('varchar', { array: true, default: [] })
    public favourites: string[] = [];
}
