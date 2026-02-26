import { Types } from "mongoose";

export interface IBaseRepo<T> {
    create(data: Partial<T>): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id: Types.ObjectId | string): Promise<T | null>;
    findByQuery(query: Partial<T>): Promise<T[]>;
    updateById(id: Types.ObjectId | string, newData: Partial<T>): Promise<T | null>;
    deleteById(id: Types.ObjectId | string): Promise<T | null>;
}