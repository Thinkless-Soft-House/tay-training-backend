interface HasId {
    id: number;
}
interface IsService {
    create(createDto: any): Promise<any>;
    createMany(items: any[]): Promise<any>;
    findAll(relations?: string[]): Promise<any>;
    findByFilter(query: any): Promise<any>;
    findOne(id: number, relations?: string[]): Promise<any>;
    update(id: number, updateDto: any): Promise<any>;
    updateMany(items: {
        id: number;
        data: any;
    }[]): Promise<any>;
    remove(id: number): Promise<any>;
}
export declare class CoreController<Entity extends HasId, Service extends IsService, CreateDTO, UpdateDTO> {
    service: Service;
    constructor(service: Service);
    create(createDto: CreateDTO): Promise<Entity>;
    createMany(createDto: CreateDTO[]): Promise<Entity[]>;
    findAll(query: any): Promise<Entity[]>;
    findByFilter(query: any): Promise<any>;
    findOne(id: string, query: any): Promise<Entity>;
    update(id: string, updateDto: UpdateDTO): Promise<Entity>;
    updateMany(updateDto: {
        id: number;
        data: UpdateDTO;
    }[]): Promise<Entity>;
    remove(id: string): Promise<Entity>;
}
export {};
