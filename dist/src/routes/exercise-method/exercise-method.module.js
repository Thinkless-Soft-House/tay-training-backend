"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseMethodModule = void 0;
const common_1 = require("@nestjs/common");
const exercise_method_service_1 = require("./exercise-method.service");
const exercise_method_controller_1 = require("./exercise-method.controller");
const exercise_method_entity_1 = require("./entities/exercise-method.entity");
const typeorm_1 = require("@nestjs/typeorm");
let ExerciseMethodModule = class ExerciseMethodModule {
};
ExerciseMethodModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([exercise_method_entity_1.ExerciseMethod])],
        controllers: [exercise_method_controller_1.ExerciseMethodController],
        providers: [exercise_method_service_1.ExerciseMethodService],
    })
], ExerciseMethodModule);
exports.ExerciseMethodModule = ExerciseMethodModule;
//# sourceMappingURL=exercise-method.module.js.map