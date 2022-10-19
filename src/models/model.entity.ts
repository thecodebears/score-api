import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity } from 'typeorm';
import { Columns } from './model.types';


@Entity()
export abstract class ModelEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    public pick(fields: string[]) {
        return fields.reduce((a, b) => b in this ? Object.assign(a, { [b]: this[b] }) : a, {})
    }
}
