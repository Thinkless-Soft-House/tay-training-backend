import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate, validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ErrorHandler } from '../handlers/error.handler';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log('🔍 ValidationPipe.transform() - INÍCIO');
    console.log('📦 Valor recebido:', JSON.stringify(value, null, 2));
    console.log('🏷️ Metatype:', metatype?.name || 'undefined');
    console.log('📋 ArgumentMetadata completo:', { metatype: metatype?.name });

    if (!metatype || !this.toValidate(metatype)) {
      console.log('⚠️ Validação pulada - metatype inválido ou tipo primitivo');
      console.log('🔄 Retornando valor original sem validação');
      return value;
    }

    console.log('✅ Metatype válido, iniciando transformação e validação');
    
    const object = plainToInstance(metatype, value);
    console.log('🔄 Objeto transformado:', JSON.stringify(object, null, 2));
    console.log('🎯 Classe do objeto transformado:', object.constructor.name);

    try {
      console.log('🚀 Iniciando validateOrReject...');
      await validateOrReject(object, {
        whitelist: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: false,
        validationError: { target: false },
      });
      
      console.log('✅ Validação bem-sucedida!');
      console.log('📤 Retornando valor validado:', JSON.stringify(value, null, 2));
      return value;
    } catch (errors) {
      console.log('❌ ERRO na validação!');
      console.log('🔥 Errors capturados:', JSON.stringify(errors, null, 2));
      console.log('📊 Número de erros:', Array.isArray(errors) ? errors.length : 'não é array');
      
      if (Array.isArray(errors)) {
        errors.forEach((error, index) => {
          console.log(`🚨 Erro ${index + 1}:`, {
            property: error.property,
            value: error.value,
            constraints: error.constraints,
            target: error.target?.constructor?.name
          });
        });
      }

      throw new ErrorHandler('Falha na validação dos dados', 400, 400, {
        errors,
      });
    }
  }

  private toValidate(metatype: any): boolean {
    console.log('🔍 toValidate() - Verificando se deve validar');
    console.log('📝 Metatype recebido:', metatype?.name);
    
    const types: any[] = [String, Boolean, Number, Array, Object];
    const shouldValidate = !types.includes(metatype);
    
    console.log('🎯 Tipos primitivos:', types.map(t => t.name));
    console.log('✅ Deve validar?', shouldValidate);
    
    return shouldValidate;
  }
}
