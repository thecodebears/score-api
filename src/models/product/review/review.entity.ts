import { Column, Entity } from 'typeorm';
import { ModelEntity } from '../../model.entity';


@Entity()
export abstract class Review extends ModelEntity {
    @Column('varchar')
    public author: string;

    @Column('int')
    public rating: number;

    @Column('varchar', { default: '' })
    public details: string;
}
