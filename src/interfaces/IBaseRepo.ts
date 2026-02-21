export interface IBaseRepo<T>{
    create(data:Partial<T>):Promise<T>;
    findAll():Promise<T[]>;
    findById(id:string):Promise<T | null>;
    findByQuery(query:object):Promise<T[]>;
    updateById(id:string, newData:Partial<T>):Promise<T | null>;
    deleteById(id:string):Promise<T | null>;
}