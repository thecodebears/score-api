import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { ConnectionType } from './connection.types';


@Entity()
export abstract class Connection extends BaseEntity {
    @Column('varchar')
    public type: ConnectionType;

    @Column('varchar')
    public key: string;

    @Column('varchar')
    public account: string;
}
