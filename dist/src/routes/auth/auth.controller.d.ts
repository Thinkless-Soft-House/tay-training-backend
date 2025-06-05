import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        id: any;
    }>;
    register(userDto: any): Promise<import("../users/entities/user.entity").User>;
    getProfile(req: any): any;
}
