/// <reference types="node" />
export declare class FileService {
    createFile(path: string, name: string, file: any): Promise<void>;
    getFile(route: string, name: string): Promise<Buffer>;
}
