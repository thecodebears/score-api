import { Column, Entity } from 'typeorm';
import { ModelEntity } from '../model.entity';


@Entity()
export abstract class Application extends ModelEntity {
    @Column('varchar', { length: 256 })
    public name: string;

    @Column('varchar')
    public description: string;

    @Column('varchar', { array: true })
    public permissions: string[];
}
