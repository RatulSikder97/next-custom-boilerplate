import { Model, ModelStatic, Transaction } from "sequelize";
import { IBaseRepository } from "@Interfaces/IBaseRepository";

export abstract class BaseRepository<T> implements IBaseRepository<T> {
    constructor(
        public readonly model: ModelStatic<Model>,
    ) { }

    async create(item: T, transaction: Transaction): Promise<T> {
        const createdItem = await this.model.create(item as any,  {transaction: transaction});
        return createdItem.toJSON() as T;
    }

    async findAll(): Promise<T[]> {
        const results = await this.model.findAll();
        return results.map((result) => result.toJSON() as T);
    }

    async findOne(id: number | Partial<T>): Promise<T | null> {
        const results = await this.model.findOne({
            where: { id }
        });
        return results?.toJSON() as T ;
    }

    async update(id: number | Partial<T>, item: T, transaction: Transaction): Promise<boolean> {
        const [rowsUpdated] = await this.model.update(item as any, {
            where: { id },
            returning: true,
            transaction
        });

        if (rowsUpdated === 0) {
            return false;
        }

        return true;
    }

    async delete(id: number, transaction: Transaction): Promise<boolean> {
        const result = await this.model.destroy({
            where: { id },
            transaction
        });

        return result > 0;
    }

}