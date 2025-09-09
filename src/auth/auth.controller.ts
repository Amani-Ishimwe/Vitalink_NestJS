import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('register')
    async register(@Body() createUserDto: RegisterUserDto) {
        return this.authService.register(createUserDto);
    }


    @Post('login')
    async login(@Body() loginDto: LoginUserDto) {
        return this.authService.login(loginDto);
    }
}
