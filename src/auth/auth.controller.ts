import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: "Register A User"})
    @ApiResponse({status : 201, description: "User registered successfully"})
    async register(@Body() createUserDto: RegisterUserDto) {
        return this.authService.register(createUserDto);
    }

 
    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiOperation({ summary:"Login  A User"})
    @ApiResponse({status : 201, description: "User logged in successfully"})
    async login(@Body() loginDto: LoginUserDto) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary:"Fetch User Profile"})
    @ApiResponse({status : 201, description: "User profile fetched successfully"})
    getProfile(@Req() req){
        return req.user;
    }
}
