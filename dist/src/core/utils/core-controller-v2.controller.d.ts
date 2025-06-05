import { ValidatorOptions } from 'class-validator';
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
export declare class CoreControllerV2<Entity extends HasId, Service extends IsService, CreateDTO, UpdateDTO> {
    service: Service;
    private readonly createEntityDtoClass;
    private readonly updateEntityDtoClass;
    private readonly validation;
    constructor(service: Service, createEntityDtoClass: new () => CreateDTO, updateEntityDtoClass: new () => UpdateDTO, validation?: ValidatorOptions);
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
