import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'; 
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ){}
   
    async validateUser( email: string , password: string) : Promise<any> {
        const user = await this.userRepository.findOneBy({ email })
        if (user && await bcrypt.compare(password, user.password)){
            const {password, ...result } = user
            return result
        }
        return null
    }

    async login(
        loginDto: LoginUserDto
    ):Promise<{ user: User, access_token: string }> {
        const user = await this.validateUser(loginDto.email, loginDto.password)
        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }
        const payload = { sub: user.id, email: user.email, role:user.role }
        return {
            user,
            access_token: this.jwtService.sign(payload)
        }
}

    async register(createUserDto: RegisterUserDto): Promise<{ user: User}> {
        const existingUser = await this.userRepository.findOneBy({ email: createUserDto.email })
         if (existingUser){
             throw new BadRequestException('User already exists')
         }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
        const newUser = this.userRepository.create({ ...createUserDto, password: hashedPassword })
        const savedUser = await this.userRepository.save(newUser)
        return { user: savedUser }
    }

    async findById(id: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { id: id } });
    }
 }
