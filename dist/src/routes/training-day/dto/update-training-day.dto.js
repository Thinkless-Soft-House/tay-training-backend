"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTrainingDayDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_training_day_dto_1 = require("./create-training-day.dto");
class UpdateTrainingDayDto extends (0, mapped_types_1.PartialType)(create_training_day_dto_1.CreateTrainingDayDto) {
}
exports.UpdateTrainingDayDto = UpdateTrainingDayDto;
//# sourceMappingURL=update-training-day.dto.js.map