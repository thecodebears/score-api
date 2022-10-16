import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { ConnectionPlatform } from './connection.types';


@Entity()
export abstract class Connection extends BaseEntity {
    @Column('varchar')
    public platform: ConnectionPlatform;

    @Column('varchar')
    public key: string;

    @Column('varchar')
    public account: string;
}
