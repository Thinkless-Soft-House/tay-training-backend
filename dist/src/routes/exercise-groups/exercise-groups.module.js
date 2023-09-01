"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseGroupsModule = void 0;
const common_1 = require("@nestjs/common");
const exercise_groups_service_1 = require("./exercise-groups.service");
const exercise_groups_controller_1 = require("./exercise-groups.controller");
const exercise_group_entity_1 = require("./entities/exercise-group.entity");
const typeorm_1 = require("@nestjs/typeorm");
let ExerciseGroupsModule = class ExerciseGroupsModule {
};
ExerciseGroupsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([exercise_group_entity_1.ExerciseGroup])],
        controllers: [exercise_groups_controller_1.ExerciseGroupsController],
        providers: [exercise_groups_service_1.ExerciseGroupsService],
    })
], ExerciseGroupsModule);
exports.ExerciseGroupsModule = ExerciseGroupsModule;
//# sourceMappingURL=exercise-groups.module.js.map