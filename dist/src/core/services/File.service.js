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
let FileService = class FileService {
    async createFile(path, name, file) {
        console.log('FileService.createFile() => Criando/Atualizando um novo arquivo');
        fs.mkdirSync(path, { recursive: true });
        if (fs.existsSync(`${path}${name}`)) {
            await fs.promises.writeFile(`${path}${name}`, file);
            console.log(`Arquivo ${name} atualizado em ${path}`);
        }
        else {
            await fs.promises.writeFile(`${path}${name}`, file);
            console.log(`Arquivo salvo como ${name} em ${path}`);
        }
        return;
    }
    async getFile(route, name) {
        console.log('FileService.createFile() => Criando um novo arquivo');
        const fullPath = path.join(route, name);
        if (fs.existsSync(fullPath)) {
            const fileBuffer = fs.readFileSync(fullPath);
            return fileBuffer;
        }
        else {
            throw new Error('Arquivo não encontrado');
        }
        return;
    }
};
FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=File.service.js.map