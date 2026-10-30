/// <reference types="node" />
export declare class FileService {
    private s3Client?;
    private get useS3();
    private get bucket();
    private get s3();
    toKey(filePath: string, name?: string): string;
    private isNotFound;
    createFile(path: string, name: string, file: any): Promise<void>;
    getFile(route: string, name: string): Promise<Buffer>;
    getFileByPath(filePath: string): Promise<Buffer>;
    getSize(filePath: string): Promise<number | null>;
    exists(filePath: string): Promise<boolean>;
}
