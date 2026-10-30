"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const client_s3_1 = require("@aws-sdk/client-s3");
let FileService = class FileService {
    get useS3() {
        return process.env.STORAGE_DRIVER === 's3';
    }
    get bucket() {
        const bucket = process.env.S3_BUCKET;
        if (!bucket)
            throw new Error('S3_BUCKET não configurado');
        return bucket;
    }
    get s3() {
        if (!this.s3Client) {
            this.s3Client = new client_s3_1.S3Client({
                region: process.env.S3_REGION || 'us-east-2',
            });
        }
        return this.s3Client;
    }
    toKey(filePath, name = '') {
        const full = `${filePath}${name}`.replace(/\\/g, '/');
        const match = full.match(/(?:^|\/)files\/(.+)$/);
        if (match)
            return match[1];
        return path.posix.normalize(full).replace(/^(\.\/|\/)+/, '');
    }
    isNotFound(error) {
        var _a;
        return ((error === null || error === void 0 ? void 0 : error.name) === 'NotFound' ||
            (error === null || error === void 0 ? void 0 : error.name) === 'NoSuchKey' ||
            ((_a = error === null || error === void 0 ? void 0 : error.$metadata) === null || _a === void 0 ? void 0 : _a.httpStatusCode) === 404);
    }
    async createFile(path, name, file) {
        if (this.useS3) {
            await this.s3.send(new client_s3_1.PutObjectCommand({
                Bucket: this.bucket,
                Key: this.toKey(path, name),
                Body: file,
                ContentType: 'application/pdf',
            }));
            return;
        }
        fs.mkdirSync(path, { recursive: true });
        await fs.promises.writeFile(`${path}${name}`, file);
        return;
    }
    async getFile(route, name) {
        return this.getFileByPath(path.join(route, name));
    }
    async getFileByPath(filePath) {
        if (this.useS3) {
            try {
                const res = await this.s3.send(new client_s3_1.GetObjectCommand({
                    Bucket: this.bucket,
                    Key: this.toKey(filePath),
                }));
                return Buffer.from(await res.Body.transformToByteArray());
            }
            catch (error) {
                if (this.isNotFound(error)) {
                    throw new Error(`Arquivo não encontrado: ${filePath}`);
                }
                throw new Error(`Erro ao ler arquivo: ${error.message}`);
            }
        }
        if (!fs.existsSync(filePath)) {
            throw new Error(`Arquivo não encontrado: ${filePath}`);
        }
        try {
            return fs.readFileSync(filePath);
        }
        catch (error) {
            throw new Error(`Erro ao ler arquivo: ${error.message}`);
        }
    }
    async getSize(filePath) {
        var _a;
        if (this.useS3) {
            try {
                const res = await this.s3.send(new client_s3_1.HeadObjectCommand({
                    Bucket: this.bucket,
                    Key: this.toKey(filePath),
                }));
                return (_a = res.ContentLength) !== null && _a !== void 0 ? _a : 0;
            }
            catch (error) {
                if (this.isNotFound(error))
                    return null;
                throw error;
            }
        }
        return fs.existsSync(filePath) ? fs.statSync(filePath).size : null;
    }
    async exists(filePath) {
        return (await this.getSize(filePath)) !== null;
    }
};
FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=File.service.js.map