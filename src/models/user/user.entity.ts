import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { UserCart } from './user.types';


@Entity()
export abstract class User extends BaseEntity {
    @Column('varchar', { length: 256 })
    @Index({ unique: true })
    public name: string;

    @Column('varchar')
    public avatarUrl: string;

    @Column('boolean')
    public employee: boolean;

    @Column('boolean')
    public admin: boolean;

    @Column('jsonb')
    public cart: UserCart;

    @Column('varchar', { array: true })
    public favourites: string[];
}
