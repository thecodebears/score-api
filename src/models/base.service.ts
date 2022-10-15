import { FindManyOptions, ObjectLiteral, Repository } from "typeorm";
import { Columns } from "./base.types";


export class EntityService<T extends ObjectLiteral> {
    protected repository: Repository<T>;

    public async create(rows: Columns<T>): Promise<T> {
        let user = await this.repository.create(rows);

        return this.repository.save(user);
    }

    public async exists(findByColumns: Columns<T>): Promise<boolean> {
        let rows: T = await this.findOneBy(findByColumns);
        return !!rows.length;
    }

    public async remove(entity: T): Promise<T> {
        return this.repository.remove(entity);
    }

    public async update(entity: T, override: Columns<T>): Promise<T> {
        Object.assign(entity, override);
        return this.repository.save(entity);
    }

    public async findBy(columns: Columns<T>): Promise<T[]> {
        return this.repository.find({ where:
            Object.entries(columns).map(e => { return { [e[0]]: e[1] } })
        } as FindManyOptions<T>);
    }

    public async findOneBy(columns: Columns<T>): Promise<T> {
        return this.repository.findOne({ where:
            Object.entries(columns).map(e => { return { [e[0]]: e[1] } })
        } as FindManyOptions<T>);
    }
}