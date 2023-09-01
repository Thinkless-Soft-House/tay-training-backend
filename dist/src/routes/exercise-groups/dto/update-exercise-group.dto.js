"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExerciseGroupDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_exercise_group_dto_1 = require("./create-exercise-group.dto");
class UpdateExerciseGroupDto extends (0, mapped_types_1.PartialType)(create_exercise_group_dto_1.CreateExerciseGroupDto) {
}
exports.UpdateExerciseGroupDto = UpdateExerciseGroupDto;
//# sourceMappingURL=update-exercise-group.dto.js.map