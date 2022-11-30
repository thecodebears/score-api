import { Column, Entity } from 'typeorm';
import { ModelEntity } from '../../model.entity';


@Entity()
export abstract class Discount extends ModelEntity {
    @Column('varchar')
    public label: string;

    @Column('float')
    public discount: number;

    @Column('int', { nullable: true })
    public endTime: number;
}
