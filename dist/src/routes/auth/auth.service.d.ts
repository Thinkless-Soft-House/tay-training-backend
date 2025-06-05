import { UsersService } from 'src/routes/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        id: any;
    }>;
    register(userDto: CreateUserDto): Promise<import("../users/entities/user.entity").User>;
    private hashPassword;
}
