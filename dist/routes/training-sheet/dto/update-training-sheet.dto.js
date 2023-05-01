"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTrainingSheetDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_training_sheet_dto_1 = require("./create-training-sheet.dto");
class UpdateTrainingSheetDto extends (0, mapped_types_1.PartialType)(create_training_sheet_dto_1.CreateTrainingSheetDto) {
}
exports.UpdateTrainingSheetDto = UpdateTrainingSheetDto;
//# sourceMappingURL=update-training-sheet.dto.js.map