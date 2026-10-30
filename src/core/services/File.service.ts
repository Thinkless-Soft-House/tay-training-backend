import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

/**
 * Armazenamento de arquivos com dois drivers, escolhidos por STORAGE_DRIVER:
 *  - 'local' (padrão): disco, pasta ./files (comportamento original)
 *  - 's3': bucket S3_BUCKET em S3_REGION (credenciais pela cadeia padrão da AWS,
 *    ex.: role da instância). As chaves seguem o layout da pasta files/
 *    (ex.: workouts/Treino_1.pdf, menus/menu_x.pdf).
 *
 * Caminhos legados como './files/menus/x.pdf' ou '/app/files/menus/x.pdf'
 * continuam funcionando: viram a chave 'menus/x.pdf'.
 */
@Injectable()
export class FileService {
  private s3Client?: S3Client;

  private get useS3(): boolean {
    return process.env.STORAGE_DRIVER === 's3';
  }

  private get bucket(): string {
    const bucket = process.env.S3_BUCKET;
    if (!bucket) throw new Error('S3_BUCKET não configurado');
    return bucket;
  }

  private get s3(): S3Client {
    if (!this.s3Client) {
      this.s3Client = new S3Client({
        region: process.env.S3_REGION || 'us-east-2',
      });
    }
    return this.s3Client;
  }

  /** './files/menus/a.pdf' | '/app/files/menus/a.pdf' | 'menus/a.pdf' -> 'menus/a.pdf' */
  toKey(filePath: string, name = ''): string {
    const full = `${filePath}${name}`.replace(/\\/g, '/');
    const match = full.match(/(?:^|\/)files\/(.+)$/);
    if (match) return match[1];
    return path.posix.normalize(full).replace(/^(\.\/|\/)+/, '');
  }

  private isNotFound(error: any): boolean {
    return (
      error?.name === 'NotFound' ||
      error?.name === 'NoSuchKey' ||
      error?.$metadata?.httpStatusCode === 404
    );
  }

  async createFile(path: string, name: string, file: any) {
    if (this.useS3) {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: this.toKey(path, name),
          Body: file,
          ContentType: 'application/pdf',
        }),
      );
      return;
    }

    // Checar se no caminho existe um arquivo com o mesmo nome
    fs.mkdirSync(path, { recursive: true });

    // Cria ou sobrescreve o arquivo
    await fs.promises.writeFile(`${path}${name}`, file);

    return;
  }

  async getFile(route: string, name: string) {
    return this.getFileByPath(path.join(route, name));
  }

  /** Lê um arquivo a partir do caminho legado (o mesmo guardado no banco). */
  async getFileByPath(filePath: string): Promise<Buffer> {
    if (this.useS3) {
      try {
        const res = await this.s3.send(
          new GetObjectCommand({
            Bucket: this.bucket,
            Key: this.toKey(filePath),
          }),
        );
        return Buffer.from(await res.Body.transformToByteArray());
      } catch (error) {
        if (this.isNotFound(error)) {
          throw new Error(`Arquivo não encontrado: ${filePath}`);
        }
        throw new Error(`Erro ao ler arquivo: ${error.message}`);
      }
    }

    // Verificar se o arquivo existe
    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo não encontrado: ${filePath}`);
    }

    try {
      return fs.readFileSync(filePath);
    } catch (error) {
      throw new Error(`Erro ao ler arquivo: ${error.message}`);
    }
  }

  /** Tamanho em bytes, ou null se o arquivo não existe. */
  async getSize(filePath: string): Promise<number | null> {
    if (this.useS3) {
      try {
        const res = await this.s3.send(
          new HeadObjectCommand({
            Bucket: this.bucket,
            Key: this.toKey(filePath),
          }),
        );
        return res.ContentLength ?? 0;
      } catch (error) {
        if (this.isNotFound(error)) return null;
        throw error;
      }
    }

    return fs.existsSync(filePath) ? fs.statSync(filePath).size : null;
  }

  async exists(filePath: string): Promise<boolean> {
    return (await this.getSize(filePath)) !== null;
  }
}
