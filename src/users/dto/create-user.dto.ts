import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/entities/user.entity";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;
    
    @IsEnum(Role)
    @IsNotEmpty()
    @ApiProperty()
    role: Role;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    phone: string;
}

