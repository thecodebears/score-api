import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity } from 'typeorm';


@Entity()
export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    public pick(fields: string[]) {
        return fields.reduce((a, b) => b in this ? Object.assign(a, { [b]: this[b] }) : a, {})
    }
}
