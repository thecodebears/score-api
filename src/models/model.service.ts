import { ObjectLiteral, Repository } from "typeorm";
import { Columns } from "./model.types";


export class ModelService<T extends ObjectLiteral> {
    protected repository: Repository<T>;

    public async create(rows: Columns<T>): Promise<T> {
        let user = await this.repository.create(rows);

        return this.repository.save(user);
    }

    public async exists(findByColumns: Columns<T>): Promise<boolean> {
        let rows: T = await this.findOneBy(findByColumns);
        return !!rows?.length;
    }

    public async remove(entity: T): Promise<T> {
        return this.repository.remove(entity);
    }

    public async update(entity: T, override: Columns<T>): Promise<T> {
        Object.assign(entity, override);
        return this.repository.save(entity);
    }

    public async findBy(columns: Columns<T>): Promise<T[]> {
        return this.repository.find({ where: columns });
    }

    public async findOneBy(columns: Columns<T>): Promise<T> {
        return this.repository.findOne({ where: columns });
    }
}