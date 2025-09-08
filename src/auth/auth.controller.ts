import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('register')
    async register(@Body() user: Partial<User>) {
        return this.authService.register(user);
    }

    @Post('login')
    async login(@Body() user: any) {
        return this.authService.login(user);
    }
}
