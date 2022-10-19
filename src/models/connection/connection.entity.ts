import { Column, Entity } from 'typeorm';
import { ModelEntity } from '../model.entity';
import { ConnectionPlatform } from './connection.types';


@Entity()
export abstract class Connection extends ModelEntity {
    @Column('varchar')
    public platform: ConnectionPlatform;

    @Column('varchar')
    public key: string;

    @Column('varchar')
    public account: string;
}
