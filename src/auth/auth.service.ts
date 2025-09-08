import { Injectable } from '@nestjs/common'; 
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ){}
   
    async validateUser( email: string , password: string) : Promise<any> {
        const user = await this.userRepository.findOneBy({ email })
        if (user && user.password === password){
            const {password, ... result } = user
            return result
        }
        return null
    }

    async login(user: any){
        const payLoad = { email: user.email, sub: user.id }
        return this.jwtService.sign(payLoad)
    }

    async register(user: Partial<User>){
        const existingUser = await this.userRepository.findOneBy({ email: user.email})
        if (existingUser){
            throw new Error('User already exists')
        }
        const newUser = this.userRepository.create(user)
        return this.userRepository.save(newUser)
    }
    async findById(id: string): Promise<User | null> {
      return this.userRepository.findOne({ where: { id: id  } });
   }
}
