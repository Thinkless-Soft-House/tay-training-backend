"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const exercises_module_1 = require("./routes/exercises/exercises.module");
const methods_module_1 = require("./routes/methods/methods.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const exercise_groups_module_1 = require("./routes/exercise-groups/exercise-groups.module");
const exercise_method_module_1 = require("./routes/exercise-method/exercise-method.module");
const exercise_configurations_module_1 = require("./routes/exercise-configurations/exercise-configurations.module");
const training_sheet_module_1 = require("./routes/training-sheet/training-sheet.module");
const training_day_module_1 = require("./routes/training-day/training-day.module");
const exercise_group_categories_module_1 = require("./routes/exercise-group-categories/exercise-group-categories.module");
const users_module_1 = require("./routes/users/users.module");
const auth_module_1 = require("./routes/auth/auth.module");
const ormconfig_1 = require("./core/database/ormconfig");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            exercises_module_1.ExercisesModule,
            methods_module_1.MethodsModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: process.env.NODE_ENV === 'production'
                    ? '.env.production'
                    : process.env.NODE_ENV === 'internal-docker'
                        ? '.env.internal-docker'
                        : '.env.development',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    console.log('configService.get("POSTGRES_HOST")', configService.get('POSTGRES_HOST'));
                    const ormconfig = (0, ormconfig_1.default)({
                        host: configService.get('POSTGRES_HOST'),
                        port: configService.get('POSTGRES_PORT'),
                        username: configService.get('POSTGRES_USER'),
                        password: configService.get('POSTGRES_PASSWORD'),
                        database: configService.get('POSTGRES_DB'),
                        synchronize: configService.get('TYPEORM_SYNC'),
                    });
                    return ormconfig;
                },
                inject: [config_1.ConfigService],
            }),
            exercise_groups_module_1.ExerciseGroupsModule,
            exercise_method_module_1.ExerciseMethodModule,
            exercise_configurations_module_1.ExerciseConfigurationsModule,
            training_sheet_module_1.TrainingSheetModule,
            training_day_module_1.TrainingDayModule,
            exercise_group_categories_module_1.ExerciseGroupCategoriesModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map