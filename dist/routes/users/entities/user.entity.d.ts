import { CoreEntity } from 'src/core/models/CoreEntity.model';
export declare class User extends CoreEntity {
    name: string;
    email: string;
    password: string;
    codeToRecovery: string;
}
