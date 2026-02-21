import { Model, Document } from "mongoose";
import { IBaseRepo } from "../interfaces/repositories/IBaseRepo";

export default class BaseRepo<T extends Document> implements IBaseRepo<T>{

    constructor(private model:Model<T>){}

    async create(data:Partial<T>): Promise<T> {
        const newDocument = await this.model.create(data);
        return newDocument;
    }

    async findAll(): Promise<T[]> {
        return await this.model.find();
    }

    async findById(id:string): Promise<T | null> {
        return await this.model.findById(id);
    }

    async findByQuery(query:object): Promise<T[]> {
        return await this.model.find(query);
    }

    async updateById(id:string, newData:Partial<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, newData, {new:true})
    }

    async deleteById(id:string): Promise<T | null> {
        return await this.model.findByIdAndDelete(id);
    }
}