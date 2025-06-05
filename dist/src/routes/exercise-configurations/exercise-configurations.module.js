"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseConfigurationsModule = void 0;
const common_1 = require("@nestjs/common");
const exercise_configurations_service_1 = require("./exercise-configurations.service");
const exercise_configurations_controller_1 = require("./exercise-configurations.controller");
const exercise_configuration_entity_1 = require("./entities/exercise-configuration.entity");
const typeorm_1 = require("@nestjs/typeorm");
let ExerciseConfigurationsModule = class ExerciseConfigurationsModule {
};
ExerciseConfigurationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([exercise_configuration_entity_1.ExerciseConfiguration])],
        controllers: [exercise_configurations_controller_1.ExerciseConfigurationsController],
        providers: [exercise_configurations_service_1.ExerciseConfigurationsService],
    })
], ExerciseConfigurationsModule);
exports.ExerciseConfigurationsModule = ExerciseConfigurationsModule;
//# sourceMappingURL=exercise-configurations.module.js.map