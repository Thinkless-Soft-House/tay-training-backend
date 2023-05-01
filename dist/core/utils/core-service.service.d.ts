import { Repository } from 'typeorm';
export declare class CoreService<T> {
    repository: Repository<T>;
    constructor(repository: Repository<T>);
    createWhere(query: any): {};
    create(createDto: any): Promise<T[]>;
    createMany(items: any[]): Promise<any[]>;
    findByFilter(query: any): Promise<{
        data: T[];
        count: number;
    }>;
    findAll(relations?: string[]): Promise<T[]>;
    findOne(id: number, relations?: string[]): Promise<T>;
    update(id: number, updateDto: any): Promise<T>;
    updateMany(items: {
        id: number;
        data: any;
    }[]): Promise<{
        id: number;
        data: any;
    }[]>;
    remove(id: number): Promise<T>;
}
