import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';


@Entity()
export abstract class Application extends BaseEntity {
    @Column('varchar', { length: 256 })
    public name: string;

    @Column('varchar')
    public description: string;

    @Column('varchar', { array: true })
    public permissions: string[];

    @Column('varchar')
    public refreshToken: string;
}
