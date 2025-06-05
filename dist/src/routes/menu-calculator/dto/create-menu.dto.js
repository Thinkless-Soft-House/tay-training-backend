"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMenuDto = exports.IsMaxCaloriesGreaterThanMin = exports.ExerciseStatus = void 0;
const class_validator_1 = require("class-validator");
var ExerciseStatus;
(function (ExerciseStatus) {
    ExerciseStatus["ACTIVE"] = "active";
    ExerciseStatus["INACTIVE"] = "inactive";
})(ExerciseStatus = exports.ExerciseStatus || (exports.ExerciseStatus = {}));
function IsMaxCaloriesGreaterThanMin(validationOptions) {
    return (0, class_validator_1.ValidateBy)({
        name: 'isMaxCaloriesGreaterThanMin',
        validator: {
            validate: (value, args) => {
                console.log('🔍 IsMaxCaloriesGreaterThanMin - VALIDAÇÃO CUSTOMIZADA');
                console.log('📊 Valor recebido (maxCalories):', value);
                console.log('🎯 Args completo:', args);
                console.log('📦 Object completo:', JSON.stringify(args.object, null, 2));
                const object = args.object;
                console.log('🔢 minCalories:', object.minCalories);
                console.log('🔢 maxCalories:', object.maxCalories);
                const isValid = object.minCalories <= object.maxCalories;
                console.log('✅ Validação resultado:', isValid);
                return isValid;
            },
            defaultMessage: () => 'Calorias máximas devem ser maiores ou igual as mínimas',
        },
    }, validationOptions);
}
exports.IsMaxCaloriesGreaterThanMin = IsMaxCaloriesGreaterThanMin;
class CreateMenuDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "pdfUrl", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'Minimo de calorias deve ser maior do que 1' }),
    __metadata("design:type", Number)
], CreateMenuDto.prototype, "minCalories", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'Maximo de calorias deve ser maior do que 1' }),
    IsMaxCaloriesGreaterThanMin({ message: 'Calorias máximas devem ser maiores ou igual as mínimas' }),
    __metadata("design:type", Number)
], CreateMenuDto.prototype, "maxCalories", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(ExerciseStatus),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "status", void 0);
exports.CreateMenuDto = CreateMenuDto;
//# sourceMappingURL=create-menu.dto.js.map