import { CreateExerciseGroupCateogoryDto } from './dto/create-exercise-group-cateogory.dto';
import { UpdateExerciseGroupCateogoryDto } from './dto/update-exercise-group-cateogory.dto';
export declare class ExerciseGroupCateogoriesService {
    create(createExerciseGroupCateogoryDto: CreateExerciseGroupCateogoryDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateExerciseGroupCateogoryDto: UpdateExerciseGroupCateogoryDto): string;
    remove(id: number): string;
}
