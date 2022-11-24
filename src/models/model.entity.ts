import { Entity, PrimaryGeneratedColumn } from 'typeorm';


abstract class ModelEntityInterface {
    public pick(fields: string[]) {
        return fields.reduce((a, b) => b in this ? Object.assign(a, { [b]: this[b] }) : a, {})
    }

    public pushUnincluded<T>(field: string, value: T) {
       if (!this[field].includes(value)) this[field].push(value);
    }
}

@Entity()
export abstract class ModelEntity extends ModelEntityInterface {
    @PrimaryGeneratedColumn('uuid')
    public id: string;
}

/**
 * For some cases like Product.
 */
@Entity()
export abstract class NumberSerializedModelEntity extends ModelEntityInterface {
     @PrimaryGeneratedColumn()
     public id: number;
 }
 