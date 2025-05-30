import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate, validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ErrorHandler } from '../handlers/error.handler';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    
    const object = plainToInstance(metatype, value);

    try {
      await validateOrReject(object, {
        whitelist: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: false,
        validationError: { target: false },
      });
      return value;
    } catch (errors) {
      
      if (Array.isArray(errors)) {
        errors.forEach((error, index) => {
          console.error(`Erro de validação ${index + 1}:`, error);
          if (error.constraints) {
            Object.keys(error.constraints).forEach(key => {
              console.error(`  - ${key}: ${error.constraints[key]}`);
            });
          }
        });
      }

      throw new ErrorHandler('Falha na validação dos dados', 400, 400, {
        errors,
      });
    }
  }

  private toValidate(metatype: any): boolean {
    
    const types: any[] = [String, Boolean, Number, Array, Object];
    const shouldValidate = !types.includes(metatype);
    
    return shouldValidate;
  }
}
